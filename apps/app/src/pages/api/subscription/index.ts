import { handler } from '@app/backend/http/handler';
import { del, patch, post } from '@app/backend/http/subscription';

export default handler({ patch, del, post });
