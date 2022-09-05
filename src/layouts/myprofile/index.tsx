import { FC } from 'react';
import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AvatarWrapper, ButtonInputWrapper, Buttons, CustomTypography, Form, FormContentWrapper, Header, InputField, TextWrapper, Wrapper, WrapperContent } from './style';

const MyProfile: FC = () => {
    const theme = useTheme();
    return (
        <Wrapper>
            <Header>
                <CustomTypography sx={{fontWeight: 600, fontSize: '1.5rem'}}>Meu Perfil</CustomTypography>
            </Header>
            <WrapperContent>
                <TextWrapper>
                    <CustomTypography variant='h6' >Dados Gerais</CustomTypography>
                    <CustomTypography sx={{ fontWeight: 'lighter', fontSize: '0.95rem'}}>Informações sobre a sua conta</CustomTypography>
                </TextWrapper>
                <Form>
                    <FormContentWrapper>
                        <CustomTypography>Foto</CustomTypography>
                        <AvatarWrapper>
                            <Avatar
                            alt='foto-perfil'
                            src='/images/avatar.png'/>
                            <Buttons variant='text'>Alterar</Buttons>
                        </AvatarWrapper>
                        <InputField
                        label='Nome'
                        type='text'
                        color='accent'
                        autoComplete='off'
                        placeholder='Digite seu nome'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <ButtonInputWrapper>
                            <InputField
                            label='E-mail'
                            type='e-mail'
                            color='accent'
                            autoComplete='off'
                            placeholder='Digite seu e-mail'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                            <Buttons variant='text'>Alterar e-mail</Buttons>
                        </ButtonInputWrapper>
                        <InputField
                        label='Telefone'
                        type='tel'
                        color='accent'
                        autoComplete='off'
                        placeholder='Digite seu telefone'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <ButtonInputWrapper>
                            <InputField
                            label='Senha'
                            type='password'
                            color='accent'
                            autoComplete='off'
                            placeholder='********'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                            <Buttons variant='text'>Alterar senha</Buttons>
                        </ButtonInputWrapper>
                    </FormContentWrapper>
                    <Buttons variant='contained'type='submit' className='submit-button'>Salvar alterações</Buttons>
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
