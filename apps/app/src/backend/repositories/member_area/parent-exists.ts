import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@app/@types/supabase/v2.types';

const ParentExists = async (
  supabase: SupabaseClient<Database>,
  parent_id: string,
) => {
  const { data, error } = await supabase
    .from('member_area_tool')
    .select('*')
    .eq('id', parent_id);

  return data;
};

export default ParentExists;
