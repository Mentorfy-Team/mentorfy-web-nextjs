import { handler } from '@app/backend/http/handler';
import { get, post } from '@app/backend/http/users/post.users';

export default handler({ post, get });
