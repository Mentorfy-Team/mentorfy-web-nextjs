import { handler } from '@app/backend/http/handler';
import { post } from '@app/backend/http/webhooks/index';
import { withAxiom } from 'next-axiom';

export default withAxiom(handler({ post }));
