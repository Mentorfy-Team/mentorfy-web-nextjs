import { handler } from '@app/backend/http/handler';
import { get, post } from '@app/backend/http/users/profile';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};

export default handler({ get, post });
