import { del, get, post } from '@app/backend/http/teams/client';
import { handler } from '@app/backend/http/handler';

export default handler({ get, del, post });
