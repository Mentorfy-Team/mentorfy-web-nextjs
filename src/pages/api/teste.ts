import { handler } from '~/backend/http/handler';

const post = async (req, res) => {
  return res.status(200).json({ ok: 200 });
};

export default handler({ post });
