import { supabase } from '../supabase';

export async function uploadDocument(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
) {
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      onUploadProgress: ({ count, total }) => {
        const progress = (count / total) * 100;
        if (onProgress) onProgress(progress);
      },
    });

  if (error) throw error;
  return data;
}

export async function createDocumentRecord(document: {
  name: string;
  path: string;
  type: string;
  category: 'NATIONAL_ID' | 'COMMERCIAL_REGISTER' | 'SOCPA_LICENSE' | 'OTHER';
  documentable_id: string;
  documentable_type: string;
}) {
  const { data, error } = await supabase
    .from('documents')
    .insert([document])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDocumentUrl(path: string) {
  const { data } = await supabase.storage
    .from('documents')
    .createSignedUrl(path, 3600); // 1 hour expiry

  return data?.signedUrl;
}