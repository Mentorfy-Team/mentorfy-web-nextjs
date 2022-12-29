import { SupabaseServer } from '../../../supabase';

type GetRequest = ProductApi.List.Request;
type GetResponse = ProductApi.List.Response | any;

export const get: Handler.Callback<GetRequest, GetResponse> = async (
  req,
  res,
) => {
  const supabase = SupabaseServer(req, res);

  const { data: type, error } = await supabase
    .from('member_area_type')
    .select('*');

  return res.status(200).json(type);
};
