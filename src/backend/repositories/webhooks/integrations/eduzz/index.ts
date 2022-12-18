import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticateRequest } from './Validations';

export const EduzzRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const confirmation = await AuthenticateRequest(req);

  if (!confirmation) return;
};
