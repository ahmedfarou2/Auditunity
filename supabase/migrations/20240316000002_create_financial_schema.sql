-- Create enum types
create type trial_balance_status as enum ('PENDING', 'PROCESSED', 'ERROR');

-- Create trial_balances table
create table trial_balances (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  period text not null,
  accounts jsonb not null default '[]'::jsonb,
  uploaded_at timestamp with time zone default now(),
  processed_at timestamp with time zone,
  status trial_balance_status default 'PENDING',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table trial_balances enable row level security;

-- Trial balances policies
create policy "Trial balances are viewable by organization members"
  on trial_balances for select
  using (
    exists (
      select 1 
      from organization_members
      where organization_id = trial_balances.organization_id
        and user_id = auth.uid()
        and status = 'APPROVED'
    )
  );

-- Create triggers
create trigger set_trial_balances_updated_at
  before update on trial_balances
  for each row
  execute function handle_updated_at();