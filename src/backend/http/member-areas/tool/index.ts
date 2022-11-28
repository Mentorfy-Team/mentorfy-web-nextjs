import AddTools from '~/backend/repositories/member_area/add-tool';
import RemoveTools from '~/backend/repositories/member_area/remove-tool';
import { SupabaseServer } from '../../../supabase';

type GetRequest = MentorTools.Post.Request;
type GetResponse = MentorTools.Post.Response | any;

export const post: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);
  const data = req.body.data;
  const id = req.body.id.length > 6 ? req.body.id : null;

  const sortedRemoveTools = data.sort((a, b) => b.type - a.type);
  const sortedAddTools = data.sort((a, b) => a.type - b.type);

  try {
    await RemoveTools(supabase, sortedRemoveTools);
    await AddTools(supabase, sortedAddTools, id);
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }

  return res.status(200).json({});
};
