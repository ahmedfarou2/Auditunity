-- Create enum types
create type audit_type as enum (
  'ANNUAL',
  'SEMI_ANNUAL',
  'QUARTERLY',
  'MONTHLY',
  'SPECIAL_PURPOSE'
);

create type audit_status as enum (
  'DRAFT',
  'PENDING_REVIEW',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED'
);

create type workpaper_status as enum (
  'DRAFT',
  'PENDING_REVIEW',
  'REVIEWED',
  'REJECTED'
);

-- Create audit_engagements table
create table audit_engagements (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references organizations(id) on delete restrict,
  firm_id uuid references organizations(id) on delete restrict,
  type audit_type not null,
  status audit_status default 'DRAFT',
  start_date date not null,
  end_date date not null,
  fiscal_year_end date not null,
  assigned_team jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  check (firm_id != client_id)
);

-- Create workpapers table
create table workpapers (
  id uuid primary key default uuid_generate_v4(),
  engagement_id uuid references audit_engagements(id) on delete cascade,
  title text not null,
  section text not null,
  prepared_by uuid references auth.users(id) on delete restrict,
  reviewed_by uuid references auth.users(id) on delete restrict,
  status workpaper_status default 'DRAFT',
  content jsonb not null default '{}'::jsonb,
  attachments text[] default array[]::text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table audit_engagements enable row level security;
alter table workpapers enable row level security;

-- Audit engagements policies
create policy "Engagements are viewable by firm members"
  on audit_engagements for select
  using (
    exists (
      select 1 
      from organization_members
      where organization_id = audit_engagements.firm_id
        and user_id = auth.uid()
        and status = 'APPROVED'
    )
  );

create policy "Engagements are viewable by client members"
  on audit_engagements for select
  using (
    exists (
      select 1 
      from organization_members
      where organization_id = audit_engagements.client_id
        and user_id = auth.uid()
        and status = 'APPROVED'
    )
  );

-- Workpapers policies
create policy "Workpapers are viewable by engagement members"
  on workpapers for select
  using (
    exists (
      select 1 
      from audit_engagements ae
      join organization_members om on 
        (om.organization_id = ae.firm_id or om.organization_id = ae.client_id)
      where ae.id = workpapers.engagement_id
        and om.user_id = auth.uid()
        and om.status = 'APPROVED'
    )
  );

-- Create triggers
create trigger set_audit_engagements_updated_at
  before update on audit_engagements
  for each row
  execute function handle_updated_at();

create trigger set_workpapers_updated_at
  before update on workpapers
  for each row
  execute function handle_updated_at();