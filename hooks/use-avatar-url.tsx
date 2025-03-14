export const useAvatarUrl = (path?: string) => {
  if (!path) return "";

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET}/${path}`;
};
