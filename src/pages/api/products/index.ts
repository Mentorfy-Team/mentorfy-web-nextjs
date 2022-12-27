import { handler } from '~/backend/http/handler';
import { del, get, post, put } from '~/backend/http/products';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired value here
    },
  },
};

export default handler({ post, get, put, del });
