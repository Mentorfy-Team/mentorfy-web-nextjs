import { handler } from '~/backend/handler';
import { get, post, put } from '~/backend/products';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired value here
    },
  },
};

export default handler({ post, get, put });
