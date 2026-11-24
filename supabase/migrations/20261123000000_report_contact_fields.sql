-- Apply before deploying the corresponding frontend. No existing data is rewritten.
begin;

alter table public.hongeo_reports
  add column submitter_nickname text,
  add column submitter_email text,
  add constraint hongeo_reports_submitter_nickname_length
    check (submitter_nickname is null or char_length(btrim(submitter_nickname)) between 1 and 40),
  add constraint hongeo_reports_submitter_email_format
    check (
      submitter_email is null or (
        char_length(submitter_email) <= 254 and
        char_length(split_part(submitter_email, '@', 1)) <= 64 and
        submitter_email ~ '^[^[:space:]@]+@[^[:space:]@.]+(\.[^[:space:]@.]+)+$'
      )
    );

comment on column public.hongeo_reports.submitter_nickname is
  'Optional, for administrators verifying the report; never publish.';
comment on column public.hongeo_reports.submitter_email is
  'Optional, for administrators verifying the report or making necessary contact; never publish.';

alter table public.hongeo_reports enable row level security;

-- Protect even if another permissive authenticated SELECT policy is introduced.
create policy "Report reads require administrator membership"
on public.hongeo_reports
as restrictive
for select
to authenticated
using (
  exists (
    select 1
    from public.hongeo_admins
    where hongeo_admins.user_id = auth.uid()
  )
);

-- RLS governs rows, but not TRUNCATE. Web roles need only form submission,
-- administrator membership lookup and administrator-only inbox operations.
revoke all privileges on table public.hongeo_reports, public.hongeo_admins
  from public, anon, authenticated;
grant select (user_id) on table public.hongeo_admins to authenticated;
grant insert (restaurant_name, address, message, submitter_nickname, submitter_email)
  on table public.hongeo_reports to anon, authenticated;
grant select on table public.hongeo_reports to authenticated;
grant update (status) on table public.hongeo_reports to authenticated;

notify pgrst, 'reload schema';
commit;
