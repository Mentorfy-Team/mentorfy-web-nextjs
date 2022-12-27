import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

const ToolIsParent = async (
  supabase: SupabaseClient<Database>,
  tool_id: string,
) => {
  const { data, error } = await supabase
    .from('member_area_tool')
    .select('*')
    .eq('parent', tool_id);

  return data;
};

export default ToolIsParent;
