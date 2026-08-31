create table if not exists public.zetbros_contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 320),
  company text check (company is null or char_length(company) <= 160),
  service text check (service is null or char_length(service) <= 120),
  message text not null check (char_length(message) between 10 and 5000),
  source text not null default 'zetbros.com' check (char_length(source) <= 100),
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);

alter table public.zetbros_contact_messages enable row level security;

revoke all on table public.zetbros_contact_messages from anon, authenticated;
grant insert on table public.zetbros_contact_messages to anon, authenticated;
grant all on table public.zetbros_contact_messages to service_role;

drop policy if exists "website visitors can submit zetbros contact messages" on public.zetbros_contact_messages;
create policy "website visitors can submit zetbros contact messages"
on public.zetbros_contact_messages
for insert
to anon, authenticated
with check (
  source = 'zetbros.com'
  and status = 'new'
  and char_length(name) between 1 and 120
  and char_length(email) between 3 and 320
  and char_length(message) between 10 and 5000
);

comment on table public.zetbros_contact_messages is
  'Contact enquiries submitted from zetbros.com. Isolated from AIKO application data.';
