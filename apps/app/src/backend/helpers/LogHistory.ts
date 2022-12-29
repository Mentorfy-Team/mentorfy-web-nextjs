import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseAdmin } from '@app/backend/supabase';

export class LogHistory {
  constructor() {
    throw new Error('This class can not be instantiated');
  }

  private static async CodeRules(
    code: LogTypes.Codes,
    supabase: SupabaseClient,
  ) {
    const firstSecond = new Date();
    firstSecond.setHours(0, 0, 0, 0);
    if (code === 100) {
      const { data, error } = await supabase
        .from('profile_history')
        .select('id')
        .gt('created_at', firstSecond.toISOString());

      return !data || data.length === 0;
    }
    return true;
  }

  static async Create(
    profile_id: string,
    code: LogTypes.Codes,
    description?: string,
    visibility = 0,
    extra?: any,
  ) {
    const supabase = SupabaseAdmin();

    // Para ser logado, deve passar nas regras.
    if (!(await this.CodeRules(code, supabase))) {
      return;
    }

    const { error } = await supabase
      .from('profile_history')
      .insert({
        profile_id: profile_id,
        code,
        description,
        visibility,
        extra,
      })
      .single();
    return { error };
  }
}
