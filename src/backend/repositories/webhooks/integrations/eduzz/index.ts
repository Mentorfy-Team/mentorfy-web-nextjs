import { NextApiRequest } from 'next';
import { AuthenticateRequest } from './Validations';

export const EduzzRoute = async (req: NextApiRequest, supabase: any) => {
  const confirmation = await AuthenticateRequest(supabase, req.query, req.body);

  if (!confirmation) return;
};
