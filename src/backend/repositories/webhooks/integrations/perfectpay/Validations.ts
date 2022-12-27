import crypto from 'crypto';
import { GetTokenByRefeerer } from '~/backend/repositories/product/GetTokenByRefeerer';
import { AvailableIntegrations } from '..';

export const isPerfectPay = (
  data: Webhook.Integration.Kiwify.ApprovedPurchase,
) => {
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
    AvailableIntegrations.PERFECTPAY,
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
