// handle nextjs api request
import { log } from 'next-axiom';

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  log.debug('webhook request', {
    request: req,
  });

  res.status(200).json({ message: 'ok' });
};
