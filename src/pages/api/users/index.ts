import { handler } from '~/backend/http/handler';
import { get, post } from '~/backend/http/users/post.users';

export default handler({ post, get });
