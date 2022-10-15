import { CreateSupabaseWithAuth } from '~/backend/supabase';

export const get: Handler.Callback<Request, Response> = async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const supabase = CreateSupabaseWithAuth(req);

    
    res.status(200);
};