import { supabase } from '../supabase';
import type { OrganizationMember } from '../../types/organization';

export async function getOrganizationMembers(organizationId: string) {
  const { data, error } = await supabase
    .from('organization_members')
    .select('*, user:user_id(*)')
    .eq('organization_id', organizationId);

  if (error) throw error;
  return data;
}

export async function addOrganizationMember(member: Omit<OrganizationMember, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('organization_members')
    .insert([member])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMemberRole(memberId: string, role: 'ADMIN' | 'MEMBER') {
  const { data, error } = await supabase
    .from('organization_members')
    .update({ role })
    .eq('id', memberId)
    .select()
    .single();

  if (error) throw error;
  return data;
}