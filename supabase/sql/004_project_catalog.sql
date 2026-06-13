alter table public.projects add column if not exists project_key text;
alter table public.projects add column if not exists slug text;
alter table public.projects add column if not exists sector text;
alter table public.projects add column if not exists category text;
alter table public.projects add column if not exists project_type text;
alter table public.projects add column if not exists image text;
alter table public.projects add column if not exists logo text;
alter table public.projects add column if not exists capabilities jsonb not null default '[]'::jsonb;
alter table public.projects add column if not exists source text not null default 'client';
alter table public.projects add column if not exists featured boolean not null default false;
alter table public.projects add column if not exists case_study boolean not null default false;
alter table public.projects add column if not exists visibility text not null default 'public';
alter table public.projects add column if not exists updated_at timestamptz not null default now();

create unique index if not exists projects_project_key_idx
  on public.projects (project_key)
  where project_key is not null;

create or replace function public.set_project_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_project_updated_at();

create or replace function public.is_optimum_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin'
    or exists (
      select 1 from public.analytics_admins
      where email = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

revoke all on function public.is_optimum_admin() from public;
grant execute on function public.is_optimum_admin() to authenticated;

drop policy if exists "Admin projects manage" on public.projects;
drop policy if exists "Optimum admins manage projects" on public.projects;
create policy "Optimum admins manage projects"
on public.projects for all
to authenticated
using (public.is_optimum_admin())
with check (public.is_optimum_admin());

drop policy if exists "Admin messages view" on public.messages;
drop policy if exists "Allow admin full access" on public.messages;
drop policy if exists "Optimum admins manage messages" on public.messages;
create policy "Optimum admins manage messages"
on public.messages for all
to authenticated
using (public.is_optimum_admin())
with check (public.is_optimum_admin());
