import { FC, useState } from 'react';
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
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
  SelectForm,
} from './style';

const MyProfile: FC = () => {
  const theme = useTheme();
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
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
          {/* Addreess page  */}
          <Header sx={{marginTop: '1.3rem'}}>
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
              color="accent"
              autoComplete="off"
              placeholder="Digite seu CEP"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Endereço"
              type="text"
              color="accent"
              autoComplete="off"
              placeholder="Ex: Rua João Neves"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Número"
              type="text"
              color="accent"
              autoComplete="off"
              placeholder="Digite o número"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Complemento"
              type="text"
              color="accent"
              autoComplete="off"
              placeholder="Ex: Casa/Trabalho"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Bairro"
              type="text"
              color="accent"
              autoComplete="off"
              placeholder="Ex: Vila Maria"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              label="Cidade"
              type="text"
              color="accent"
              autoComplete="off"
              placeholder="Ex: São Paulo"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <InputField
              id='state-input'
              label="Estado"
              type="text"
              color="accent"
              autoComplete="off"
              placeholder="Ex: SP"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <SelectForm color='accent'>
              <InputLabel id='state-select'>Estado</InputLabel>
              <Select
                id='state-select'
                value={age}
                onChange={handleChange}
                label='Estado'
                inputProps={{
                  shrink: true,
                }}
                >
                  <MenuItem value='SP'>SP</MenuItem>
                  <MenuItem value='RJ'>RJ</MenuItem>
                  <MenuItem value='SC'>SC</MenuItem>
                </Select>
            </SelectForm>
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
