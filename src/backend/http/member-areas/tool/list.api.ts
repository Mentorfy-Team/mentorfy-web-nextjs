import { SupabaseServer } from '../../../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);

  const { data: tools } = await supabase
    .from('member_area_tool')
    .select('*')
    .eq('member_area', req.query.id);

  // sort by order
  const sortedTools = tools.sort((a, b) => a.order - b.order);
  const toolGroups = list_to_tree(sortedTools);

  return res.status(200).json(toolGroups);
};

function list_to_tree(list) {
  let node, i;
  const roots = [];
  const map = {};

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].rows = []; // initialize the rows
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent) {
      // if you have dangling branches check that map[node.parent] exists
      list[map[node.parent]].rows.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
