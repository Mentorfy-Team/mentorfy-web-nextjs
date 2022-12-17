import { NextApiRequest, NextApiResponse } from 'next';
import { KiwifyRoute } from './kiwify';

const AvailableIntegrations = {
  KIWIFY: 'kiwify',
} as const;

export const RouteIntegrationTarget = (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const host = req.headers.host;

  host.includes(AvailableIntegrations.KIWIFY) && KiwifyRoute(req, res);
};
