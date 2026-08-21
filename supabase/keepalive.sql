create table if not exists public.hongeo_keepalive_pings (
  id text primary key default 'github-actions',
  last_ping_at timestamptz not null default now(),
  ping_count bigint not null default 1
);

alter table public.hongeo_keepalive_pings enable row level security;

create or replace function public.hongeo_keepalive()
returns table(last_ping_at timestamptz, ping_count bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  insert into public.hongeo_keepalive_pings as pings (id, last_ping_at, ping_count)
  values ('github-actions', now(), 1)
  on conflict (id)
  do update set
    last_ping_at = excluded.last_ping_at,
    ping_count = pings.ping_count + 1
  returning pings.last_ping_at, pings.ping_count;
end;
$$;

revoke all on public.hongeo_keepalive_pings from anon, authenticated;
revoke all on function public.hongeo_keepalive() from public;
grant execute on function public.hongeo_keepalive() to anon, authenticated;
