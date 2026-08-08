create table if not exists public.hongeo_visitors (
  visitor_id text primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.hongeo_visit_days (
  visitor_id text not null references public.hongeo_visitors(visitor_id) on delete cascade,
  visit_date date not null,
  first_seen_at timestamptz not null default now(),
  primary key (visitor_id, visit_date)
);

alter table public.hongeo_visitors enable row level security;
alter table public.hongeo_visit_days enable row level security;

create or replace function public.hongeo_track_visit(
  p_visitor_id text,
  p_visit_date date default ((now() at time zone 'Asia/Seoul')::date)
)
returns table(today_visitors bigint, total_visitors bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_visitor_id text;
begin
  clean_visitor_id := left(regexp_replace(coalesce(p_visitor_id, ''), '[^a-zA-Z0-9_-]', '', 'g'), 96);

  if clean_visitor_id = '' then
    raise exception 'visitor id is required';
  end if;

  insert into public.hongeo_visitors (visitor_id)
  values (clean_visitor_id)
  on conflict (visitor_id)
  do update set last_seen_at = now();

  insert into public.hongeo_visit_days (visitor_id, visit_date)
  values (clean_visitor_id, p_visit_date)
  on conflict (visitor_id, visit_date)
  do nothing;

  return query
  select
    (select count(*) from public.hongeo_visit_days where visit_date = p_visit_date) as today_visitors,
    (select count(*) from public.hongeo_visitors) as total_visitors;
end;
$$;

revoke all on public.hongeo_visitors from anon, authenticated;
revoke all on public.hongeo_visit_days from anon, authenticated;
grant execute on function public.hongeo_track_visit(text, date) to anon, authenticated;
