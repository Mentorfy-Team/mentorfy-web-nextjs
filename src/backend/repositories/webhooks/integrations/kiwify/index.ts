import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticateRequest } from './Validations';

export const KiwifyRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const confirmation = await AuthenticateRequest(req);

  if (!confirmation) return;
};
