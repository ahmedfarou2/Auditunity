import { supabase } from '../supabase';
import type { Organization } from '../../types/organization';

export async function getOrganizations() {
  const { data, error } = await supabase
    .from('organizations')
    .select(`
      *,
      members:organization_members(*)
    `);

  if (error) throw error;
  return data;
}

export async function getOrganizationById(id: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select(`
      *,
      members:organization_members(*),
      documents(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createOrganization(organization: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('organizations')
    .insert([organization])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateOrganization(id: string, updates: Partial<Organization>) {
  const { data, error } = await supabase
    .from('organizations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}