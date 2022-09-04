import { FC } from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Form, Header, InputField, TextWrapper, Wrapper, WrapperContent } from './style';

const MyProfile: FC = () => {
    const theme = useTheme();
    return (
        <Wrapper>
            <Header>
                <Typography variant='h5'
                >Meu Perfil</Typography>
            </Header>
            <WrapperContent>
                <TextWrapper>
                    <Typography variant='h6'>Dados Gerais</Typography>
                    <Typography>informações sobre a sua conta</Typography>
                </TextWrapper>
                <Form>
                    <Typography>Foto</Typography>
                    <Avatar alt='foto-perfil' src='/images/avatar.png' />
                    <Button variant='outlined'>Alterar</Button>

                    <InputField
                    label='Nome'
                    type='text'
                    placeholder='Digite seu nome'
                    InputLabelProps={{
                        shrink: true,
                      }}
                      />

                    <InputField
                    variant='standard'
                    label='E-mail'
                    type='e-mail'
                    placeholder='Digite seu e-mail'
                    InputLabelProps={{
                        shrink: true,
                      }}
                      />
                     <Button variant='text'>Alterar e-mail</Button>
                    <InputField
                    label='Telefone'
                    type='tel'
                    placeholder='Digite seu telefone'
                    InputLabelProps={{
                        shrink: true,
                      }}
                      />
                    <InputField
                    label='Senha'
                    type='password'
                    placeholder='********'
                    InputLabelProps={{
                        shrink: true,
                      }}
                      />
                    <Button variant='outlined'>Alterar senha</Button>

                    <Button variant='contained'>Salvar alterações</Button>
                </Form>
            </WrapperContent>

        </Wrapper>
    );
};
export async function getProps() {
    return {
        props: {},
    };

};

export default MyProfile;
