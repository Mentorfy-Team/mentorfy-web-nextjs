import { del, get, post } from '~/backend/http/teams/client';
import { handler } from '~/backend/http/handler';

export default handler({ get, del, post });
