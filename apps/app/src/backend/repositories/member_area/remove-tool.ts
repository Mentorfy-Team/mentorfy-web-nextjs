import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@app/@types/supabase/v2.types';
import ToolIsParent from './ToolIsParent';

const RemoveTools = async (supabase: SupabaseClient<Database>, list) => {
  for (let i = 0; i < list.length; i++) {
    const tool = list[i];
    delete (tool as any).toRemove;

    const isUUID = tool.id && tool.id.length > 6 && tool.id.includes('-');
    const tool_id = isUUID ? tool.id : null;

    // Se o id for maior que 6, é um id do supabase e devemos remover se o delete for true
    if (tool.delete) {
      if (isUUID) {
        delete tool.delete;
        const parents = await ToolIsParent(supabase, tool.id);
        if (parents.length) {
          for (let index = 0; index < parents.length; index++) {
            parents[index]['delete'] = true;
          }
          await RemoveTools(supabase, parents);
        }

        const { error } = await supabase
          .from('member_area_tool')
          .delete()
          .match({ id: tool_id });

        const result = error;
      } else {
        continue;
      }
    }
  }
};

export default RemoveTools;
