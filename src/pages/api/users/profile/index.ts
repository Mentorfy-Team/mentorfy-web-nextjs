import { handler } from '~/backend/handler';
import { get, post } from '~/backend/users/profile';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};

export default handler({ get, post });
