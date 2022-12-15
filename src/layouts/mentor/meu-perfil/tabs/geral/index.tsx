/* eslint-disable no-restricted-imports */
import { useEffect, useMemo, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

import { useRouter } from 'next/router';
import LinearProgressWithLabel from '~/components/modules/LinearProgress';
import {
  AvatarWrapper,
  BOX,
  Card,
  CardDivider,
  CustomTypography,
  Session,
  Spacing,
  Title,
} from '../../style';
import { useHistory } from '~/hooks/useHistory';
import { userStore } from '~/stores';
import { useGetClientProducts } from '~/hooks/useGetClientProducts';
import StatusCard from './components/StatusCard';
import MentorClientsTable from './components/ClientsTable';
import { useClients } from '~/hooks/useClients';

const MyProfile = ({ profile, user, isViewingMentored, isViewingMentor }) => {
  const [tab, setTab] = useState(0);
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const States = ['AC', 'SP', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO'];
  const [data, setData] = useState<UserTypes.ProfileWithAddress>({
    profile,
  });
  const [avatar, setAvatar] = useState({
    file: data.profile?.avatar as string | ArrayBuffer,
    type: '',
  });
  const { setLoading } = userStore();
  const { history, isLoading: isLoadingHistory } = useHistory(profile?.id);
  const { product, isLoading: isLoadingProducts } = useGetClientProducts(
    user?.id,
    profile?.id,
  );

  const {
    clients,
    statistics,
    mutate,
    isLoading: isLoadingClient,
  } = useClients(user.id, null, profile?.id);

  useEffect(() => {
    setLoading(isLoadingHistory || isLoadingProducts);
  }, [isLoadingHistory, setLoading, isLoadingProducts]);

  const ActiveClients = useMemo(() => {
    return clients.filter((c) => c.hasActivety).length;
  }, [clients]);

  const InactiveClients = useMemo(() => {
    return clients.filter((c) => !c.hasActivety).length;
  }, [clients]);

  return (
    <>
      <Card>
        <Spacing>
          <Title pt={2} variant="h6">
            {isViewingMentor ? 'Perfil do Mentor' : 'Perfil do Aluno'}
          </Title>
        </Spacing>
        <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
        <Spacing>
          <Session>
            <AvatarWrapper>
              <Avatar
                alt="foto-perfil"
                src={profile?.avatar as string}
                sx={{ width: 70, height: 70 }}
              />
              <BOX>
                <CustomTypography variant="body1">
                  {profile?.name}
                </CustomTypography>
                <CustomTypography sx={{ opacity: '0.4', fontSize: '0.9rem' }}>
                  {profile?.email}
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
            {/* {&& <GearSVG />} */}
          </Session>
        </Spacing>
        {isViewingMentor && (
          <>
            <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
            <Spacing>
              <Box display="flex" gap={6}>
                <StatusCard
                  title="Clientes Ativos"
                  value={ActiveClients}
                  percentage={ActiveClients / (clients?.length / 100)}
                />
                <StatusCard
                  title="Clientes Inativos"
                  value={InactiveClients}
                  sign="-"
                  percentage={(InactiveClients / (clients?.length / 100)) * -1}
                />
                <Box
                  sx={{
                    opacity: 0.2,
                  }}
                >
                  <StatusCard
                    title="Porcentagem de Conclusão (em breve)"
                    value="0"
                    percentage={0}
                  />
                </Box>
              </Box>
            </Spacing>
          </>
        )}
        <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
        {product && product.length > 0 && (
          <Spacing>
            <Title pb={0} variant="body1">
              Conteúdos
            </Title>
            {product
              ?.filter((p) => p.owner !== profile?.id)
              ?.map((p) => (
                <Session
                  sx={{
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                  key={p.id}
                >
                  <AvatarWrapper>
                    <Avatar
                      alt="foto-perfil"
                      src={p.main_image as string}
                      sx={{ width: 30, height: 30 }}
                    />
                    <Title variant="body2">{p.title}</Title>
                  </AvatarWrapper>
                  <Box sx={{ width: '200px' }}>
                    <LinearProgressWithLabel value={p.progress} />
                  </Box>
                </Session>
              ))}
          </Spacing>
        )}
        <CardDivider>
          <Session>
            <Title variant="caption">
              Matrícula:{' '}
              {new Date(profile?.created_at).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Title>
          </Session>
        </CardDivider>
      </Card>
      <Card mt={3} mb={isViewingMentor ? 0 : 2}>
        <Spacing>
          <Title pt={2} pb={1} variant="h6">
            {!isViewingMentor ? 'Últimas Atividades' : 'Histórico de Clientes'}
          </Title>
        </Spacing>
        {isViewingMentor && (
          <Spacing>
            <MentorClientsTable rows={clients} />
          </Spacing>
        )}
        {!isViewingMentor && (
          <>
            <Grid container spacing={6}>
              <Grid xs={2} pl={8}>
                <Title sx={{ float: 'left' }} variant="caption" color="gray">
                  Realizado em
                </Title>
              </Grid>
              <Grid xs={2}>
                <Title sx={{ float: 'left' }} variant="caption" color="gray">
                  Atividade
                </Title>
              </Grid>
              <Grid>
                <Title sx={{ float: 'left' }} variant="caption" color="gray">
                  Descrição
                </Title>
              </Grid>
            </Grid>
            <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
          </>
        )}
        {!isViewingMentor &&
          history
            .slice(0, 6)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            )
            .map((item, index) => (
              <>
                <Grid container spacing={6}>
                  <Grid xs={2} pl={8}>
                    <Title sx={{ float: 'left' }} variant="caption">
                      {new Date(item.created_at).toLocaleDateString('pt-BR', {
                        hour: 'numeric',
                        minute: 'numeric',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Title>
                  </Grid>
                  <Grid xs={2}>
                    <Title sx={{ float: 'left' }} variant="caption">
                      {item.log_type.title}
                    </Title>
                  </Grid>
                  <Grid>
                    <Title sx={{ float: 'left' }} variant="caption">
                      {'Você ' + item.description?.toLowerCase()}
                    </Title>
                  </Grid>
                </Grid>
                <Divider sx={{ borderColor: '#272727', marginY: 2 }} />
              </>
            ))}
      </Card>
    </>
  );
};

export default MyProfile;
