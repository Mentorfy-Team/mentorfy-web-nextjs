import { handler } from '@app/backend/http/handler';
import { del } from '@app/backend/http/upload';

export default handler({ post: del });
