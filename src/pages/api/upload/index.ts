import { handler } from '~/backend/handler';
import { del, post } from '~/backend/upload';

export default handler({ post, del });

export const config = {
  api: {
    bodyParser: false,
  },
};
