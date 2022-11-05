import { del, get, post } from '~/backend/clients';
import { handler } from '~/backend/handler';

export default handler({ post, get, del });
