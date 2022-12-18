// handle nextjs api request
import { AxiomAPIRequest } from 'next-axiom';

import { NextApiResponse } from 'next';
import { RouteIntegrationTarget } from '~/backend/repositories/webhooks/integrations';

export const post = async (req: AxiomAPIRequest, res: NextApiResponse) => {
  req.log.info('webhook request', {
    CallerHeader: req.headers,
    CallerBody: req.body,
  });

  const conclusion = await RouteIntegrationTarget(req, res);

  res.status(200).json({ message: 'ok' });
};
