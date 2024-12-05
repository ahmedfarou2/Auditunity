-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create enum types
create type organization_type as enum ('FIRM', 'COMPANY');
create type organization_status as enum ('PENDING', 'APPROVED', 'REJECTED');
create type verification_status as enum ('PENDING', 'VERIFIED', 'REJECTED');
create type registration_type as enum ('PARTNER', 'EMPLOYEE');
create type document_category as enum ('NATIONAL_ID', 'COMMERCIAL_REGISTER', 'SOCPA_LICENSE', 'OTHER');

-- Create organizations table
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name_ar text not null,
  name_en text not null,
  type organization_type not null,
  registration_number text not null unique,
  subdomain text not null unique,
  admin_id uuid references auth.users(id) on delete restrict,
  status organization_status default 'PENDING',
  allowed_email_domain text,
  global_network text,
  license_number text unique,
  registration_type registration_type,
  registered_by jsonb,
  verification_status verification_status default 'PENDING',
  verification_date timestamp with time zone,
  agreement_accepted boolean default false,
  agreement_date timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create organization_members table
create table organization_members (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  role text not null check (role in ('ADMIN', 'MEMBER')),
  permissions text[] default array[]::text[],
  status text not null check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  joined_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, organization_id)
);

-- Create documents table
create table documents (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  path text not null,
  type text not null,
  category document_category not null,
  documentable_id uuid not null,
  documentable_type text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create RLS policies
alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table documents enable row level security;

-- Organizations policies
create policy "Organizations are viewable by members"
  on organizations for select
  using (
    auth.uid() in (
      select user_id 
      from organization_members 
      where organization_id = organizations.id
        and status = 'APPROVED'
    )
    or auth.uid() = admin_id
  );

create policy "Organizations can be created by authenticated users"
  on organizations for insert
  with check (auth.uid() = admin_id);

create policy "Organizations can be updated by admins"
  on organizations for update
  using (auth.uid() = admin_id)
  with check (auth.uid() = admin_id);

-- Organization members policies
create policy "Members are viewable by organization members"
  on organization_members for select
  using (
    exists (
      select 1 
      from organization_members om
      where om.organization_id = organization_members.organization_id
        and om.user_id = auth.uid()
        and om.status = 'APPROVED'
    )
  );

create policy "Members can be added by organization admins"
  on organization_members for insert
  with check (
    exists (
      select 1 
      from organizations
      where id = organization_members.organization_id
        and admin_id = auth.uid()
    )
  );

-- Documents policies
create policy "Documents are viewable by organization members"
  on documents for select
  using (
    exists (
      select 1 
      from organization_members
      where organization_id = documents.documentable_id::uuid
        and user_id = auth.uid()
        and status = 'APPROVED'
    )
  );

-- Create functions
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers
create trigger set_organizations_updated_at
  before update on organizations
  for each row
  execute function handle_updated_at();

create trigger set_organization_members_updated_at
  before update on organization_members
  for each row
  execute function handle_updated_at();

create trigger set_documents_updated_at
  before update on documents
  for each row
  execute function handle_updated_at();