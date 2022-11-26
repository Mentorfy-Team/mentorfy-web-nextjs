import { del, get, post } from '~/backend/http/clients';
import { handler } from '~/backend/http/handler';

export default handler({ post, get, del });
