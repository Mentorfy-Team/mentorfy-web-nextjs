/* eslint-disable no-restricted-imports */
import { FC, useCallback, useEffect, useState } from 'react';
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
import { ActionButton } from '../produtos/pages/styles';
import {
  AvatarWrapper,
  BOX,
  Buttons,
  CustomSelectField,
  CustomTypography,
  Form,
  Header,
  InputField,
  UploadButton,
} from './style';

type UpdateForm = Partial<UserClient.User> &
  Partial<UserClient.Profile> &
  Partial<UserClient.Address>;

const MyProfile: FC<PageTypes.Props> = ({ profile, address, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const { register, handleSubmit } = useForm<UpdateForm>();
  const States = ['AC', 'SP', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO'];
  const [data, setData] = useState<UserTypes.ProfileWithAddress>({
    profile,
    address,
  });
  const [avatar, setAvatar] = useState({
    file: data.profile.avatar as string | ArrayBuffer,
    type: '',
  });

  const onSubmit: SubmitHandler<UpdateForm> = useCallback(
    async (values) => {
      setIsLoading(true);
      const propProfile = {};
      const propAddress = {};
      const propUser = {};
      const propAvatar = {};
      let propOldAvatar;

      // * verificar se as propriedades de values são iguais as do profile, se for adicionar a um objeto
      if (values.name && values.name !== data?.profile?.name)
        Object.assign(propProfile, { name: values.name });

      if (avatar.file !== data?.profile?.avatar) {
        Object.assign(propAvatar, avatar);
        propOldAvatar = data?.profile?.avatar;
      }

      // * verificar se as propriedades de values são iguais as do user, se for adicionar a um objeto
      if (values.email && values.email !== profile.email)
        Object.assign(propUser, { email: values.email });
      if (values.phone && values.phone !== profile.phone)
        Object.assign(propUser, { phone: values.phone });

      // * verificar se as propriedades de values são iguais as do address, se for adicionar a um objeto
      if (values.zipcode && values.zipcode !== data?.address?.zipcode)
        Object.assign(propAddress, { zipcode: values.zipcode });

      if (values.street && values.street !== data?.address?.street)
        Object.assign(propAddress, { street: values.street });

      // ? o number é um number, por isso não pode ser comparado com !==
      if (values.number && values.number != data?.address?.number)
        Object.assign(propAddress, { number: values.number });

      if (
        values.neighborhood &&
        values.neighborhood !== data?.address?.neighborhood
      )
        Object.assign(propAddress, { neighborhood: values.neighborhood });

      if (values.city && values.city !== data?.address?.city)
        Object.assign(propAddress, { city: values.city });

      if (values.state && values.state !== data?.address?.state)
        Object.assign(propAddress, { state: values.state });

      if (values.complement && values.complement !== data?.address?.complement)
        Object.assign(propAddress, { complement: values.complement });

      const registerData = await UpdateProfile({
        profile: propProfile,
        address: propAddress,
        user: propUser,
        avatar: propAvatar,
        old_avatar: propOldAvatar,
      });
      if (registerData.error) {
        setError('Ocorreu um erro na hora de salvar os seus dados.');
      }
      setIsLoading(false);
      router.reload();
    },
    [data, profile, router, avatar],
  );

  const handleCapture = (target) => {
    const fileReader = new FileReader();
    if (!target.files || target.files.length <= 0) return;

    fileReader.readAsDataURL(target.files[0]);
    const type = target.files[0].type.split('/')[1];

    fileReader.onload = (e) => {
      setAvatar({ file: e.target.result, type });
    };
  };

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
                src={avatar.file as string}
                sx={{ width: 70, height: 70 }}
              />
              <BOX>
                <CustomTypography fontWeight="bold" variant="body1">
                  Foto de perfil
                </CustomTypography>
                <CustomTypography sx={{ opacity: '0.7', fontSize: '0.9rem' }}>
                  Recomendação: 70x70 pixels
                </CustomTypography>
                <ActionButton
                  color="primary"
                  as="label"
                  sx={{ padding: '0px', height: '30px' }}
                  onChange={(e) => handleCapture(e.target)}
                >
                  Trocar <input hidden accept="image/*" type="file" />
                </ActionButton>
              </BOX>
            </AvatarWrapper>
            <InputField
              label="Nome"
              type="text"
              color="secondary"
              autoComplete="off"
              defaultValue={data?.profile?.name}
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
              defaultValue={data?.profile?.email}
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
              defaultValue={data?.profile?.phone}
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
              defaultValue={data?.address?.zipcode}
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
              defaultValue={data?.address?.street}
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
              defaultValue={data?.address?.number}
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
              defaultValue={data?.address?.neighborhood}
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
              defaultValue={data?.address?.complement}
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
              defaultValue={data?.address?.city}
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
                defaultValue={data?.address?.state}
                onChange={(e, child) => {
                  setData((old) => ({
                    ...old,
                    address: { ...data.address, state: e.target.value as any },
                  }));
                }}
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
    const { profile, address } = await GetProfile(ctx.req, true);
    return {
      props: { profile, address },
    };
  },
});

export default MyProfile;
