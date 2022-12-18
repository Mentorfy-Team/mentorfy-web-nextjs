import { handler } from '~/backend/http/handler';
import { post } from '~/backend/http/webhooks/index';
import { withAxiom } from 'next-axiom';

export default withAxiom(handler({ post }));
