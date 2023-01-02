import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Product = {
  id: string;
  created_at: string;
  member_area: string;
  type: number;
  title: string;
  description: string;
  status: boolean;
  data: any;
  order: number;
  extra: any;
  parent: string;
};

export const CloneTools = async (
  supabase: SupabaseClient<Database>,
  data: {
    refProduct: any;
    newProduct: any;
  },
) => {
  const { error, data: member_area_ref_tools } = await supabase
    .from('member_area_tool')
    .select('*')
    .eq('member_area', data.refProduct.member_area);

  if (error) {
    return {
      error: 'Erro ao clonar modelo',
    };
  }

  // sort tools by created_at
  member_area_ref_tools.sort((a: Product, b: Product) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const createdTools = [];

  for (let i = 0; i < member_area_ref_tools.length; i++) {
    const tool = member_area_ref_tools[i];
    const oldId = tool.id;
    delete tool.id;
    delete tool.created_at;
    delete tool.member_area;

    const { data: newTool, error: eTool } = await supabase
      .from('member_area_tool')
      .insert({
        ...tool,
        member_area: data.newProduct.id,
      })
      .select('*')
      .single();

    createdTools.push({ ...newTool, oldId });
  }

  // update parent of tools based on old id
  for (let i = 0; i < createdTools.length; i++) {
    const tool = createdTools[i];
    if (tool.parent) {
      const parent = createdTools.find((t) => t.oldId === tool.parent);
      if (parent) {
        await supabase
          .from('member_area_tool')
          .update({
            parent: parent.id,
          })
          .eq('id', tool.id);
      }
    }
  }

  return null;
};
