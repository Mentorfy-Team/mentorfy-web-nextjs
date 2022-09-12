export const LoadUserProfile = async (supabase, id) => {
  const { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', id)
    .single();

  return profile;
};
