/* eslint-disable no-restricted-imports */
import { FC, useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadUserAddress, LoadUserProfile } from '~/backend/users/repository';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { Routes } from '~/consts';
import { routes } from '~/consts/routes/routes.consts';
import { UpdateProfile } from '~/services/profile.service';
import {
  AvatarWrapper,
  BOX,
  Buttons,
  CustomSelectField,
  CustomTypography,
  Form,
  Header,
  InputField,
} from './style';

type props = {
  profile: UserClient.Profile;
  address: UserClient.Address;
  user: UserClient.User;
};

type UpdateForm = UserClient.User & UserClient.Profile & UserClient.Address;

const MyProfile: FC<props> = ({ profile, address, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const { register, handleSubmit } = useForm<UpdateForm>();
  const route = useRouter();
  const States = ['AC', 'SP', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO'];

  const onSubmit: SubmitHandler<UpdateForm> = useCallback(
    async (values) => {
      setIsLoading(true);
      const propProfile = {};
      const propAddress = {};
      const propUser = {};

      // * verificar se as propriedades de values são iguais as do profile, se for adicionar a um objeto
      if (values.name !== profile.name)
        Object.assign(propProfile, { name: values.name });
      if (values.avatar !== profile.avatar)
        Object.assign(propProfile, { avatar: values.avatar });

      // * verificar se as propriedades de values são iguais as do user, se for adicionar a um objeto
      if (values.email !== user.email)
        Object.assign(propUser, { email: values.email });
      if (values.phone !== user.phone)
        Object.assign(propUser, { phone: values.phone });

      // * verificar se as propriedades de values são iguais as do address, se for adicionar a um objeto
      if (values.zipcode !== address.zipcode)
        Object.assign(propAddress, { name: values.name });
      if (values.street !== address.street)
        Object.assign(propAddress, { name: values.name });
      if (values.number !== address.number)
        Object.assign(propAddress, { name: values.name });
      if (values.neighborhood !== address.neighborhood)
        Object.assign(propAddress, { name: values.name });
      if (values.city !== address.city)
        Object.assign(propAddress, { name: values.name });
      if (values.state !== address.state)
        Object.assign(propAddress, { name: values.name });
      if (values.complement !== address.complement)
        Object.assign(propAddress, { name: values.name });

      const registerData = await UpdateProfile({
        profile: propProfile as UserClient.Profile,
        address: propAddress as UserClient.Address,
        user: propUser as UserClient.User,
      });

      if (!registerData.error) {
        route.push(routes.home.path);
      } else {
        setError('Ocorreu um erro na hora de salvar os seus dados');
      }
      setIsLoading(false);
    },
    [route],
  );

  const HeaderDrawer = <Typography variant="h6">Meu Perfil</Typography>;
  return (
    <PageWrapper>
      <MiniDrawer header={HeaderDrawer}>
        <ContentWidthLimit maxWidth={600}>
          <Header>
            <CustomTypography variant="h6">Dados Gerais</CustomTypography>
            <CustomTypography
              sx={{ fontWeight: 'lighter', fontSize: '0.95rem' }}
            >
              Informações sobre a sua conta
            </CustomTypography>
          </Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <AvatarWrapper>
              <Avatar
                alt="foto-perfil"
                src="/images/avatar.png"
                sx={{ width: 70, height: 70 }}
              />
              <BOX>
                <CustomTypography variant="body1">
                  Minha imagem
                </CustomTypography>
                <Buttons>Alterar</Buttons>
                <CustomTypography sx={{ opacity: '0.7', fontSize: '0.7rem' }}>
                  Recomendação: 70x70 pixels
                </CustomTypography>
              </BOX>
            </AvatarWrapper>
            <InputField
              label="Nome"
              type="text"
              color="secondary"
              autoComplete="off"
              defaultValue={profile.name}
              placeholder="Digite seu nome"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="E-mail"
              type="e-mail"
              color="secondary"
              autoComplete="off"
              defaultValue={user.email}
              placeholder="Digite seu e-mail"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Telefone"
              type="tel"
              color="secondary"
              autoComplete="off"
              defaultValue={user.phone}
              placeholder="Digite seu telefone"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Senha"
              type="password"
              color="secondary"
              autoComplete="off"
              placeholder="********"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Buttons
              variant="contained"
              type="submit"
              className="submit-button"
            >
              Salvar alterações
            </Buttons>
          </Form>
          {/* Addreess page  */}
          <Header sx={{ marginTop: '1.3rem' }}>
            <CustomTypography variant="h6">Endereço</CustomTypography>
            <CustomTypography
              sx={{ fontWeight: 'lighter', fontSize: '0.95rem' }}
            >
              Para entrega das suas premiações
            </CustomTypography>
          </Header>
          <Form>
            <InputField
              label="CEP"
              type="text"
              color="secondary"
              autoComplete="off"
              placeholder="Digite seu CEP"
              {...register('zipcode')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Endereço"
              type="text"
              color="secondary"
              autoComplete="off"
              placeholder="Ex: Rua João Neves"
              {...register('street')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Número"
              type="text"
              color="secondary"
              autoComplete="off"
              placeholder="Digite o número"
              {...register('number')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Complemento"
              type="text"
              color="secondary"
              autoComplete="off"
              placeholder="Ex: Casa/Trabalho"
              {...register('complement')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Bairro"
              type="text"
              color="secondary"
              autoComplete="off"
              placeholder="Ex: Vila Maria"
              {...register('neighborhood')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Cidade"
              type="text"
              color="secondary"
              autoComplete="off"
              placeholder="Ex: São Paulo"
              {...register('city')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomSelectField required sx={{ width: '100%', margin: '0px' }}>
              <InputLabel shrink={true}>Estado</InputLabel>
              <Select
                placeholder="Ex: SP"
                label="Estado"
                onChange={() => {}}
                color="secondary"
                notched={true}
              >
                {States.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </CustomSelectField>
            <Buttons
              variant="contained"
              type="submit"
              className="submit-button"
              loading={isLoading}
              disabled={isLoading}
            >
              Salvar alterações
            </Buttons>
          </Form>
        </ContentWidthLimit>
      </MiniDrawer>
    </PageWrapper>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: Routes.login,
  async getServerSideProps(ctx) {
    const profile = await LoadUserProfile(ctx);
    const address = await LoadUserAddress(ctx);

    return {
      props: {
        profile,
        address,
      },
    };
  },
});

export default MyProfile;
