import { handler } from '~/backend/http/handler';
import { del, patch, post } from '~/backend/http/subscription';

export default handler({ patch, del, post });
