// handle nextjs api request
import { log } from 'next-axiom';

import { NextApiRequest, NextApiResponse } from 'next';
import { RouteIntegrationTarget } from '~/backend/repositories/webhooks/integrations';

export const post = async (req: NextApiRequest, res: NextApiResponse) => {
  log.debug('webhook request', {
    request: req,
  });

  const conclusion = await RouteIntegrationTarget(req, res);

  res.status(200).json({ message: 'ok' });
};
