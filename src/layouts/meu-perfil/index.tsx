import { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ContentWidthLimit, MiniDrawer, PageWrapper } from '~/components';
import {
  AvatarWrapper,
  BOX,
  Buttons,
  CustomTypography,
  Form,
  Header,
  InputField,
} from './style';

const MyProfile: FC = () => {
  const theme = useTheme();
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
          <Form>
            <AvatarWrapper>
              <Avatar alt="foto-perfil" src="/images/avatar.png" sx={{width: 70, height: 70}}/>
              <BOX>
                <CustomTypography variant='body1'>Minha imagem</CustomTypography>
                <Buttons>Alterar</Buttons>
                <CustomTypography sx={{opacity: '0.7', fontSize: '0.7rem'}}>Recomendação: 70x70 pixels</CustomTypography>
              </BOX>
            </AvatarWrapper>
            <InputField
              label="Nome"
              type="text"
              color="accent"
              autoComplete="off"
              placeholder="Digite seu nome"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="E-mail"
              type="e-mail"
              color="accent"
              autoComplete="off"
              placeholder="Digite seu e-mail"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Telefone"
              type="tel"
              color="accent"
              autoComplete="off"
              placeholder="Digite seu telefone"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Senha"
              type="password"
              color="accent"
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
        </ContentWidthLimit>
      </MiniDrawer>
    </PageWrapper>
  );
};
export async function getProps() {
  return {
    props: {},
  };
}

export default MyProfile;
