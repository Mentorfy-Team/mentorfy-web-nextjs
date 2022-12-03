import { del, get, post } from '~/backend/http/teams/mentor';
import { handler } from '~/backend/http/handler';

export default handler({ get, del, post });
