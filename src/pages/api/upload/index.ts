import { handler } from '~/backend/handler';
import { post } from '~/backend/upload';

export default handler({ post });

export const config = {
  api: {
    bodyParser: false,
  },
};