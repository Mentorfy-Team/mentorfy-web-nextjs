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
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
import { PublicRoutes } from '~/consts';
import { GetProfile, UpdateProfile } from '~/services/profile.service';
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

type UpdateForm = Partial<UserClient.User> &
  Partial<UserClient.Profile> &
  Partial<UserClient.Address>;

const MyProfile: FC<PageTypes.Props> = ({ profile, address, user }) => {
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
      if (values.name && values.name !== profile?.name)
        Object.assign(propProfile, { name: values.name });
      if (values.avatar && values.avatar !== profile?.avatar)
        Object.assign(propProfile, { avatar: values.avatar });

      // * verificar se as propriedades de values são iguais as do user, se for adicionar a um objeto
      if (values.email && values.email !== user.email)
        Object.assign(propUser, { email: values.email });
      if (values.phone && values.phone !== user.phone)
        Object.assign(propUser, { phone: values.phone });

      // * verificar se as propriedades de values são iguais as do address, se for adicionar a um objeto
      if (values.zipcode && values.zipcode !== address?.zipcode)
        Object.assign(propAddress, { zipcode: values.zipcode });

      if (values.street && values.street !== address?.street)
        Object.assign(propAddress, { street: values.street });

      // ? o number é um number, por isso não pode ser comparado com !==
      if (values.number && values.number != address?.number)
        Object.assign(propAddress, { number: values.number });

      if (values.neighborhood && values.neighborhood !== address?.neighborhood)
        Object.assign(propAddress, { neighborhood: values.neighborhood });

      if (values.city && values.city !== address?.city)
        Object.assign(propAddress, { city: values.city });

      if (values.state && values.state !== address?.state)
        Object.assign(propAddress, { state: values.state });

      if (values.complement && values.complement !== address?.complement)
        Object.assign(propAddress, { complement: values.complement });

      const registerData = await UpdateProfile({
        profile: propProfile,
        address: propAddress,
        user: propUser,
      });
      if (registerData.error) {
        setError('Ocorreu um erro na hora de salvar os seus dados.');
      }
      setIsLoading(false);
    },
    [address, profile, user],
  );

  const HeaderDrawer = <Typography variant="h6">Meu Perfil</Typography>;
  return (
    <PageWrapper>
      <MiniDrawer profile={profile} header={HeaderDrawer}>
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
              {...register('name')}
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
              {...register('email')}
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
              {...register('phone')}
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              defaultValue={address?.zipcode}
              label="CEP"
              type="tel"
              color="secondary"
              autoComplete="off"
              placeholder="Digite seu CEP"
              {...register('zipcode')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              defaultValue={address?.street}
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
              defaultValue={address?.number}
              label="Número"
              type="tel"
              color="secondary"
              autoComplete="off"
              placeholder="Digite o número"
              {...register('number')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              defaultValue={address?.neighborhood}
              type="text"
              color="secondary"
              autoComplete="off"
              placeholder="Ex: Vila Maria"
              {...register('neighborhood')}
              label="Bairro"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              defaultValue={address?.complement}
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
              defaultValue={address?.city}
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
            <CustomSelectField
              required={false}
              sx={{ width: '100%', margin: '0px' }}
            >
              <InputLabel shrink={true}>Estado</InputLabel>
              <Select
                placeholder="Ex: SP"
                label="Estado"
                color="secondary"
                defaultValue={address?.state}
                notched={true}
                {...register('state')}
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
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const profileWithAddress = await GetProfile(ctx.req, true);
    return {
      props: profileWithAddress,
    };
  },
});

export default MyProfile;
