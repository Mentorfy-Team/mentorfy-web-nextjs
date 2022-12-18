import { NextApiRequest, NextApiResponse } from 'next';
import { EduzzRoute } from './eduzz';
import { HotmartRoute } from './hotmart';
import { KiwifyRoute } from './kiwify';
import { PerfectPayRoute } from './perfectpay';

const AvailableIntegrations = {
  KIWIFY: 'kiwify',
  PERFECTPAY: 'perfectpay',
  EDUZZ: 'eduzz',
  HOTMART: 'hotmart',
} as const;

export const RouteIntegrationTarget = (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const host = req.headers.host;

  host.includes(AvailableIntegrations.KIWIFY) && KiwifyRoute(req, res);
  host.includes(AvailableIntegrations.HOTMART) && HotmartRoute(req, res);
  host.includes(AvailableIntegrations.PERFECTPAY) && PerfectPayRoute(req, res);
  host.includes(AvailableIntegrations.EDUZZ) && EduzzRoute(req, res);
};
