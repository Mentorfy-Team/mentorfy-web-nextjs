import { del, get, post } from '@app/backend/http/clients';
import { handler } from '@app/backend/http/handler';

export default handler({ post, get, del });
