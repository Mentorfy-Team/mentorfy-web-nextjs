import { del, get, post } from '@app/backend/http/teams';
import { handler } from '@app/backend/http/handler';

export default handler({ get, del, post });
