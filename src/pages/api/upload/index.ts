import { handler } from '~/backend/http/handler';
import { del, post } from '~/backend/http/upload';

export default handler({ post, del });

export const config = {
  api: {
    bodyParser: false,
  },
};
