import { handler } from '~/backend/http/handler';
import { del } from '~/backend/http/upload';

export default handler({ post: del });
