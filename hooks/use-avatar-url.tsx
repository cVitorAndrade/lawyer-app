export const getAvatarUrl = (path?: string | null) => {
  if (!path) return "";

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET}/${path}`;
};

export const getAvatarFallback = (name: string) => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  const firstInitial = firstName ? firstName[0].toUpperCase() : "";
  const lastInitial = lastName ? lastName[0].toUpperCase() : "";

  return `${firstInitial}${lastInitial}`;
};
