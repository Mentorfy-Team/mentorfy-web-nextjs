import { PagarmeRoute } from './pagarme/index';
import { isPagarme } from './pagarme/Validations';
import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '~/backend/supabase';
import { EduzzRoute } from './eduzz';
import { isEduzz } from './eduzz/Validations';
import { HotmartRoute } from './hotmart';
import { isHotmart } from './hotmart/Validations';
import { KiwifyRoute } from './kiwify';
import { isKiwify } from './kiwify/Validations';
import { PerfectPayRoute } from './perfectpay';
import { isPerfectPay } from './perfectpay/Validations';

export const AvailableIntegrations = {
  KIWIFY: 'kiwify',
  PERFECTPAY: 'perfectpay',
  EDUZZ: 'eduzz',
  HOTMART: 'hotmart',
} as const;

export const RouteIntegrationTarget = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const supabase = await SupabaseAdmin(req);
  let result = null;

  if (isPagarme(req.query)) {
    result = await PagarmeRoute(req, supabase);
  } else if (isKiwify(req.body)) {
    result = await KiwifyRoute(req, supabase);
  } else if (isHotmart(req.body)) {
    result = await HotmartRoute(req, supabase);
  } else if (isPerfectPay(req.body)) {
    result = await PerfectPayRoute(req, supabase);
  } else if (isEduzz(req.body)) {
    result = await EduzzRoute(req, supabase);
  }

  if (result) {
    return true;
  } else {
    return false;
  }
};
