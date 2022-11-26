import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '~/@types/supabase/v2.types';

type Props = {
  supabase: SupabaseClient<Database>;
  data: {
    email: string;
    password: string;
    name: string;
    refeerer: string;
  };
};

export const CreateAccount = async ({
  supabase,
  data: { email, password, name, refeerer },
}: Props) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios.');
  }

  // * Cria a autenticação do usuário no banco de dados
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  // * Se tudo estiver certo, atualiza o perfil do usuário
  if (!error) {
    await supabase
      .from('profile')
      .update({
        name,
        plan: 'pro',
        email: user.email,
        phone: user.phone,
        access_type: refeerer ? 'mentorado' : 'mentor',
      })
      .eq('id', user.id);
  }

  // * Se houver erro, retorna o erro
  if (error && error.message === 'User already registered') {
    throw new Error('Esse email já está sendo utilizado.');
  }

  if (refeerer) {
    const {
      data: { id },
    } = await supabase
      .from('product')
      .select('id')
      .eq('refeerer', refeerer)
      .single();

    await supabase.from('client_product').insert({
      user_id: user.id,
      product_id: id,
      subscription: true,
      approved: false,
    });
  }

  return user;
};
