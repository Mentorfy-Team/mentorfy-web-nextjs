//import { SupabaseServer } from '../../../supabase';

import CreateCertificate from '~/backend/repositories/member_area/create-certificate';

export const get = async (req, res) => {
  // const supabase = SupabaseServer(req, res);

  // const { data: type, error } = await supabase
  //   .from('member_area_type')
  //   .select('*');

  await CreateCertificate();

  return res.status(200).json({});
};
