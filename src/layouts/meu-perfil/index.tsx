/* eslint-disable no-restricted-imports */
import { FC } from 'react';
import { OutlinedInput } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';
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

const MyProfile: FC = () => {
  const States = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO'];

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);

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
