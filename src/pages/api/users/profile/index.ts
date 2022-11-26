import { handler } from '~/backend/http/handler';
import { get, post } from '~/backend/http/users/profile';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};

export default handler({ get, post });
