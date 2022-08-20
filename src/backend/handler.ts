import {NextApiRequest, NextApiResponse} from 'next';

type Callback = Handler.Callback<any, any>;

export const handler = <TRequest, TResponse>({
  del,
  get,
  patch,
  post,
  put,
}: {
  del?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  get?: Callback,
  patch?: Callback,
  post?: Callback,
  put?: Callback,
}) => async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if(req.method === 'GET' && get) await get(req, res);
  else if(req.method === 'POST' && post) await post(req, res);
  else if(req.method === 'PATCH' && patch) await patch(req, res);
  else if(req.method === 'PUT' && put) await put(req, res);
  else if(req.method === 'DELETE' && del) await patch(req, res);
};