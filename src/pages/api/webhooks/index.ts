// handle nextjs api request

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('webhook request', req.body);

  res.status(200).json({ message: 'ok' });
};
