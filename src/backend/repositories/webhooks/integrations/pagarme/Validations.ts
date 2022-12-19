import crypto from 'crypto';
import { GetTokenByRefeerer } from '~/backend/repositories/product/GetTokenByRefeerer';
import { AvailableIntegrations } from '..';

export const isPagarme = (data) => {
  if (data?.current_status) return true;

  return false;
};

export const AuthenticateRequest = async (
  supabase,
  query: any,
  order: Webhook.Integration.Kiwify.ApprovedPurchase,
) => {
  const { token } = await GetTokenByRefeerer(
    supabase,
    query.id,
    AvailableIntegrations.KIWIFY,
  );

  if (!token) return false;
  const calculatedSignature = crypto
    .createHmac('sha1', token)
    .update(JSON.stringify(order))
    .digest('hex');

  if (query.signature !== calculatedSignature) {
    return false;
  }

  return true;
};
