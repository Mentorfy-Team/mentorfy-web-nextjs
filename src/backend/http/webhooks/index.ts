// handle nextjs api request
import { AxiomAPIRequest } from 'next-axiom';

import { NextApiResponse } from 'next';
import { RouteIntegrationTarget } from '~/backend/repositories/webhooks/integrations';

export const post = async (req: AxiomAPIRequest, res: NextApiResponse) => {
  req.log.info('webhook request', {
    body: req.body,
    queries: req.query,
  });

  const conclusion = await RouteIntegrationTarget(req, res);

  if (conclusion) {
    return res.status(200).json({ info: 'ok' });
  } else {
    return res.status(400).json({ info: 'bad request' });
  }
};
