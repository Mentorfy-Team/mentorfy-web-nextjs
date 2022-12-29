import crypto from 'crypto';
import { GetTokenByRefeerer } from '@app/backend/repositories/product/GetTokenByRefeerer';
import { AvailableIntegrations } from '..';

export const isKiwify = (data: Webhook.Integration.Kiwify.ApprovedPurchase) => {
  if (data?.Commissions?.kiwify_fee) return true;

  return false;
};

export const AuthenticateRequest = async (
  supabase,
  query: any,
  order: Webhook.Integration.Kiwify.ApprovedPurchase,
  isMentorFy = false,
) => {
  let token;
  if (isMentorFy) {
    token = 'fx61ww84mni';
  } else {
    const data = await GetTokenByRefeerer(
      supabase,
      query.id,
      AvailableIntegrations.KIWIFY,
    );
    token = data?.token;
  }

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
