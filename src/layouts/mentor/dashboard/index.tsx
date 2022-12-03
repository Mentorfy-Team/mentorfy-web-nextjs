import { FC, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import Finances from './components/finance';
import Indicators from './components/Indicators';
import { BannerWrapper, DescriptionText, ImagesBox, MentorName, NameWrapper, TextsWrapper, WelcomeText } from './styles';
import { GetAuthSession } from '~/helpers/AuthSession';
import Mountain from '~/../public/svgs/favicon';

const Dashboard: FC<PageTypes.Props> = ({ user }) => {
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
        <BannerWrapper
        >
          <TextsWrapper>
            <NameWrapper>
              <Mountain />
              <MentorName>Olá, {user.email}</MentorName>
            </NameWrapper>
            <WelcomeText>
              Seja bem-vindo(a) ao Mentorfy
            </WelcomeText>
            <DescriptionText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates qui, repudiandae corrupti, voluptatum aut consequatur,
              debitis autem iure dolorum reprehenderit ipsum praesentium sunt?
              Aut temporibus dolores saepe facere exercitationem ratione?
              Aut temporibus dolores saepe facere exercitationem ratione?
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
            }}
          >
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

  return {
    props: {
      user: session.user,
    },
  };
};

export default Dashboard;
