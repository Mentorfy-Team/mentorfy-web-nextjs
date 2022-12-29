import { handler } from '@app/backend/http/handler';
import { del, post } from '@app/backend/http/upload';

export default handler({ post, del });

export const config = {
  api: {
    bodyParser: false,
  },
};
