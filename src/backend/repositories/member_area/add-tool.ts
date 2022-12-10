import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

const IsUUID = (str) => {
  return str.length > 6 && str.includes('-');
};

const AddTools = async (supabase: SupabaseClient<Database>, list, id) => {
  let single;
  const addedTools = [];
  for (let i = 0; i < list.length; i++) {
    const tool = list[i];
    delete (tool as any).toRemove;

    const isUUID = tool.id && IsUUID(tool.id);
    const tool_id = isUUID ? tool.id : null;

    // Se o id não for uuid, então é um novo registro
    if (!isUUID) {
      const saveOldId = tool.id;
      delete tool.id;
      delete tool.rows;
      delete tool.parent_tool;

      if (tool.parent && tool.parent.toString() !== 'undefined') {
        // Procura se algum parent foi criado no mesmo request
        const parent = addedTools.find((tl) => {
          if (tl.oldId === tool.parent) {
            tool.parent = tl.id;
          }
        });

        // Se não encontrou o parent na criação e o parent ainda não existe, adicionamos o parent
        if (!parent && !IsUUID(tool.parent)) {
          const tl = await AddTools(
            supabase,
            [list.find((t) => t.id === tool.parent)],
            id,
          );
          tool.parent = tl.id;
        }
      }
      const { data: memberAreaTool, error } = await supabase
        .from('member_area_tool')
        .insert({ ...tool, member_area: id })
        .select('*')
        .single();

      if (error) {
        //console.log(error);
      }
      single = memberAreaTool;
      addedTools.push({ ...memberAreaTool, oldId: saveOldId });
    } else {
      // Se o id for uuid, então é um registro existente
      delete tool.id;
      delete tool.rows;
      delete tool.parent_tool;
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

  return single;
};

export default AddTools;
