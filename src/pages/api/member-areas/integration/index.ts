import { handler } from '~/backend/http/handler';
import { get, patch } from '~/backend/http/member-areas/integration';

export default handler({ get, patch });
