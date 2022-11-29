import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

const AddTools = async (supabase: SupabaseClient<Database>, list, id) => {
  let count = 0;
  const addedTools = [];
  for (let i = 0; i < list.length; i++) {
    count++;
    const tool = list[i];
    delete (tool as any).toRemove;

    const isUUID = tool.id && tool.id.length > 6 && tool.id.includes('-');
    const tool_id = isUUID ? tool.id : null;

    // Se o id não for uuid, então é um novo registro
    if (!isUUID) {
      const saveOldId = tool.id;
      delete tool.id;

      if (tool.parent) {
        addedTools.find((tl) => {
          if (tl.oldId === tool.parent) {
            tool.parent = tl.id;
          }
        });
      }
      const { data: memberAreaTool, error } = await supabase
        .from('member_area_tool')
        .insert({ ...tool, member_area: id })
        .select('*')
        .single();

      if (error) {
        //console.log(error);
      }
      addedTools.push({ ...memberAreaTool, oldId: saveOldId });
    } else {
      // Se o id for uuid, então é um registro existente
      delete tool.id;
      delete tool.rows;
      if ((tool.data as any)?.length === 0) {
        tool.data = null;
      }
      const { data: memberAreaTool, error } = await supabase
        .from('member_area_tool')
        .update(tool)
        .match({ id: tool_id })
        .select('*')
        .single();

      if (error) {
        //console.log(error);
      } else {
        list[i].parent = memberAreaTool.parent;
      }
    }
  }

  return count;
};

export default AddTools;
