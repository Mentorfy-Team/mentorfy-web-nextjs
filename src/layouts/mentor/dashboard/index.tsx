import { FC, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Finances from './components/finance';
import Indicators from './components/Indicators';
import {
  BannerWrapper,
  DescriptionText,
  ImagesBox,
  MentorName,
  NameWrapper,
  TextsWrapper,
  WelcomeText,
} from './styles';
import { GetAuthSession } from '~/helpers/AuthSession';
import Mountain from '~/../public/svgs/favicon';
import Soon from '~/components/atoms/Soon';
import { GetProfileById } from '~/backend/repositories/user/GetProfileById';
import { SupabaseServer } from '~/backend/supabase';

const Dashboard: FC<PageTypes.Props> = ({ user, profile }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   setWidth(ref.current.offsetWidth);
  //   setHeight(ref.current.offsetHeight);
  // }, []);

  return (
    <>
      <ContentWidthLimit
        withToolBar={false}
        withoutScroll={true}
        maxWidth={1900}
      >
        <BannerWrapper>
          <TextsWrapper>
            <NameWrapper>
              <Mountain />
              <MentorName>Olá, {profile?.name}</MentorName>
            </NameWrapper>
            <WelcomeText>Seja bem-vindo(a) ao Mentorfy</WelcomeText>
            <DescriptionText>
              Mais que uma plataforma dedicada a mentores, somos um caminho.
              Acreditamos que o papel de um mentor é descobrir soluções e
              caminhos que ainda não existem na realidade humana, mas quando
              criados e mapeados, podem dar nomes às montanhas assim como foi
              com George EVEREST. Mentor, essa é a sua jornada, bem vindo ao
              caminho que vai te transformar em uma lenda!
            </DescriptionText>
          </TextsWrapper>
          <Image
            alt="banner"
            width={371}
            height={150}
            src="/images/frase.png"
            quality={100}
            style={{ margin: '3rem 0 0 auto' }}
          />
        </BannerWrapper>
        <Indicators />
        <Finances />
        <Box
          sx={{
            marginTop: '1.2rem',
            display: 'flex',
            gap: '1.2rem',
            marginBottom: '2rem',
          }}
        >
          <ImagesBox>
            <Soon>Em breve</Soon>
            <Image
              alt="banner"
              width={310}
              height={282}
              style={{
                objectFit: 'contain',
              }}
              src="/images/schedule.png"
            />
          </ImagesBox>
          <ImagesBox>
            <Soon>Em breve</Soon>
            <Image
              alt="banner"
              width={302}
              height={284}
              style={{
                objectFit: 'contain',
              }}
              src="/images/basic-info.png"
            />
          </ImagesBox>
          <Box
            sx={{
              width: '456px',
              height: '282px',
              cursor: 'pointer',
              flex: 1,
              position: 'relative',
            }}
          >
            <Soon>Em breve</Soon>
            <Image
              alt="banner"
              width={490}
              height={285}
              style={{
                objectFit: 'contain',
              }}
              src="/images/income.png"
            />
          </Box>
          <Box sx={{ flex: 1 }} />
        </Box>
      </ContentWidthLimit>
    </>
  );
};

// * ServerSideRender (SSR)
export const getProps = async (ctx) => {
  const { session } = await GetAuthSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  const supabase = SupabaseServer(ctx.req, ctx.res);
  const userData = await GetProfileById(supabase, {
    id: session.user.id,
  });
  return {
    props: {
      user: session.user,
      profile: userData.profile,
    },
  };
};

export default Dashboard;
