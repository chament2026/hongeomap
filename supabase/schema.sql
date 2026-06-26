create table if not exists public.hongeo_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.hongeo_reports (
  id uuid primary key default gen_random_uuid(),
  restaurant_name text not null,
  address text,
  message text,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.hongeo_admins enable row level security;
alter table public.hongeo_reports enable row level security;

drop policy if exists "Admins can see themselves" on public.hongeo_admins;
create policy "Admins can see themselves"
on public.hongeo_admins
for select
using (user_id = auth.uid());

drop policy if exists "Anyone can submit hongeo reports" on public.hongeo_reports;
create policy "Anyone can submit hongeo reports"
on public.hongeo_reports
for insert
with check (true);

drop policy if exists "Only admins can read hongeo reports" on public.hongeo_reports;
create policy "Only admins can read hongeo reports"
on public.hongeo_reports
for select
using (
  exists (
    select 1
    from public.hongeo_admins
    where hongeo_admins.user_id = auth.uid()
  )
);

drop policy if exists "Only admins can update hongeo reports" on public.hongeo_reports;
create policy "Only admins can update hongeo reports"
on public.hongeo_reports
for update
using (
  exists (
    select 1
    from public.hongeo_admins
    where hongeo_admins.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.hongeo_admins
    where hongeo_admins.user_id = auth.uid()
  )
);

-- 운영자 아이디를 chament2026 으로 쓰려면
-- Supabase Dashboard > Authentication > Users 에서 아래 이메일 형식으로 운영자 계정을 먼저 만드세요.
-- email: chament2026@hongeomap.local
-- password: 채팅에 입력한 운영자 비밀번호
--
-- 계정을 만든 뒤 user_id를 복사해서 아래 값을 바꿔 1회 실행하세요.
--
-- insert into public.hongeo_admins (user_id, email)
-- values ('운영자-auth-user-id', 'chament2026@hongeomap.local')
-- on conflict (user_id) do update set email = excluded.email;
