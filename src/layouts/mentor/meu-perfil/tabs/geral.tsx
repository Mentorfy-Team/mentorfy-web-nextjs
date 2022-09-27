/* eslint-disable no-restricted-imports */
import { FC, useCallback, useState } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Toolbar from '~/components/modules/Toolbar';
import { PublicRoutes } from '~/consts';
import { GetProfile, UpdateProfile } from '~/services/profile.service';
import { ActionButton } from '../../produtos/pages/styles';
import GearSVG from '~/../public/svgs/gear';
import {
  AvatarWrapper,
  BOX,
  Buttons,
  Card,
  CardDivider,
  CustomSelectField,
  CustomTypography,
  Form,
  Header,
  InputField,
  Session,
  Spacing,
  Title,
} from '../style';
import LinearProgressWithLabel from '~/components/modules/LinearProgress';

const MyProfile = ({profile}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const States = ['AC', 'SP', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO'];
  const [data, setData] = useState<UserTypes.ProfileWithAddress>({
    profile,
  });
  const [avatar, setAvatar] = useState({
    file: data.profile.avatar as string | ArrayBuffer,
    type: '',
  });

  return (
    <>
          <Card>
            <Spacing>
              <Title pt={2} variant='h6'>Perfil do Aluno</Title></Spacing>
            <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
            <Spacing><Session>
              <AvatarWrapper>
                <Avatar
                  alt="foto-perfil"
                  src={avatar.file as string}
                  sx={{ width: 70, height: 70 }}
                />
                <BOX>
                  <CustomTypography variant="body1">
                    {profile.name}
                  </CustomTypography>
                  <CustomTypography sx={{ opacity: '0.4', fontSize: '0.9rem' }}>
                    {profile.email}
                  </CustomTypography>
                  {/* <ActionButton
                  color="primary"
                  as="label"
                  sx={{ padding: '0px', height: '30px' }}
                  onChange={(e) => handleCapture(e.target)}
                >
                  Trocar <input hidden accept="image/*" type="file" />
                </ActionButton> */}
                </BOX>
              </AvatarWrapper>
              <GearSVG />
            </Session></Spacing>
            <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
            <Spacing><Title pb={2} variant='body1'>Conteúdos</Title>
              <Session>
                <AvatarWrapper>
                  <Avatar
                    alt="foto-perfil"
                    src={avatar.file as string}
                    sx={{ width: 30, height: 35 }}
                  />
                  <Title variant="body2">
                    Mentoria M4
                  </Title>
                </AvatarWrapper>
                <Box sx={{ width: '200px' }}>
                  <LinearProgressWithLabel value={50} />
                </Box>
              </Session></Spacing>
            <CardDivider>
                <Session>
                  <Title variant="caption">Matrícula: {'18-09-2022 15:31'}</Title>
                  <Title pl={6} variant="caption">{'Mentoria M4'}</Title>
                </Session>
                <Title onClick={()=>{}} sx={{
                  cursor: 'pointer',
                  width: '30px',
                  textAlign: 'end',
                }} pb={1} variant="h6">...</Title>
            </CardDivider>
          </Card>
          <Card mt={3} mb={6}>
            <Spacing>
              <Title pt={2} pb={1} variant='h6'>Histórico de Atividades</Title>
            </Spacing>
            <Grid container spacing={6}>
              <Grid xs={4} pl={8}>
                <Title sx={{float: 'left'}} variant='caption' color='gray'>Realizado em</Title>
              </Grid>
              <Grid  xs={6}>
                <Title sx={{float: 'left'}} variant='caption' color='gray'>Atividade</Title>
              </Grid>
            </Grid>
            <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
            {[1,2,3,4].map((item, index) => (
              <>
              <Grid container spacing={6}>
              <Grid xs={4} pl={8}>
              <Title sx={{float: 'left'}} variant='caption'>05-07-2022</Title>
              </Grid>
              <Grid  xs={6}>
              <Title sx={{float: 'left'}} variant='caption' >Visualizou o curso Whatsapp Lucrativo</Title>
              </Grid>
            </Grid>
            <Divider sx={{ borderColor: '#272727', marginY: 2 }} /></>
            ))}
          </Card>
    </>
  );
};

export default MyProfile;
