import Image from 'next/image';
import { FC } from 'react';
import { GetAuthSession } from '~/helpers/AuthSession';
import Trilhas from './components/Trilhas';
import { SupabaseServer } from '~/backend/supabase';
import { CheckForSubscription } from '~/backend/repositories/subscription/CheckForSubscription';
import isReadOnly from '~/helpers/IsReadOnly';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Options = [
  {
    id: 'fuji',
    name: 'Fuji',
    description: (
      <>
        <p>Faturamento 10k</p>
        {`O Monte Fuji é considerado sagrado pelos japoneses desde os tempos antigos pelos budistas, que acreditam que a montanha é a porta de entrada para um novo mundo
      Parabéns você alcançou o primeiro degrau da sua jornada, solucionando problemas e impactando a vida dos seus mentorados.
       O Fuji Marca o início dos seus 5 dígitos mensais.
      `}
      </>
    ),
    image: '/images/jornada/fuji-single.png',
    banner: '/images/jornada/fuji-banner.png',
    bannerAlt: 'Fuji',
  },
  {
    id: 'kili',
    name: 'Kilimanjaro',
    description: (
      <>
        <p>Faturamento 100k</p>
        {`O Kilimanjaro é a maior montanha do continente africano tendo como significado montanha branca. Suas geleiras resistem ao seu cume há mais de 10.000 anos.
      Imagina você ser o único de um continente inteiro? 
      Ele é o maior, se destacou entre todos ao seu redor.
      Você se tornou um mentor profissional e a sua ascensão ao kilimanjaro  
      tem o seguinte significado: Você se destacou entre os demais. 
      O Kilimanjaro marca  o início dos seus 6 digitos mensais.`}
      </>
    ),
    image: '/images/jornada/kili-single.png',
    banner: '/images/jornada/kili-banner.png',
    bannerAlt: 'Kilimanjaro',
  },
  {
    id: 'olimpo',
    name: 'Olimpo',
    description: (
      <>
        <p>Faturamento 100k</p>
        {`Sabe-se também que, quando
        Gaia deu origem aos Titãs, eles fizeram das montanhas gregas, inclusive
        as do monte Olimpo, seus tronos, pois eram tão grandes que mal cabiam na
        crosta terrestre. Parabéns você chegou ao Panteão dos Deuses! Você se
        tornou uma lenda para as pessoas que te cercam. `}
      </>
    ),
    image: '/images/jornada/olimpo-single.png',
    banner: '/images/jornada/olimpo-banner.png',
    bannerAlt: 'Olimpo',
  },
  {
    id: 'everest',
    name: 'Everest',
    description: (
      <>
        <p>Faturamento 500k</p>
        {`Até 1841 não se sabia exatamente sua posição geográfica e nem sua altura. Recebeu o nome graças a George Everest, um topógrafo indiano que conseguiu pela primeira vez mensurar sua altitude e detalhar sua posição.
      Esse é o papel de um mentor: descobrir soluções e caminhos que ainda não existem na realidade humana, mas quando criados e mapeados, podem dar nomes às montanhas. 
      Parabéns, você conquistou o topo do mundo e se tornou um legado.`}
      </>
    ),
    image: '/images/jornada/everest-single.png',
    banner: '/images/jornada/everest-banner.png',
    bannerAlt: 'Everest',
  },
  {
    id: 'k2',
    name: 'K2',
    description: (
      <>
        <p>Faturamento 1 Milhão</p>
        {`Até 1841 não se sabia exatamente sua posição geográfica e nem sua altura. Recebeu o nome graças a George Everest, um topógrafo indiano que conseguiu pela primeira vez mensurar sua altitude e detalhar sua posição.
    Esse é o papel de um mentor: descobrir soluções e caminhos que ainda não existem na realidade humana, mas quando criados e mapeados, podem dar nomes às montanhas. 
    Parabéns, você conquistou o topo do mundo e se tornou um legado.`}
      </>
    ),
    image: '/images/jornada/k2-single.png',
    banner: '/images/jornada/k2-banner.png',
    bannerAlt: 'K2',
  },
];

const current = 0;

const Dashboard: FC<PageTypes.Props> = () => {
  return (
    <>
      <Box height={620} position="relative">
        <div
          style={{
            position: 'absolute',
            marginTop: '2rem',
            marginLeft: '-1.5rem',
          }}
        >
          <Trilhas fill="gray" />
        </div>
        <Image
          alt="monte-fugi"
          width={1100}
          height={600}
          src="/images/jornada/FUJI.png"
          style={{ position: 'absolute' }}
        />
        <Image
          alt="monte-kilimanjaro"
          width={1100}
          height={600}
          src="/images/jornada/KILIMANJARO.png"
          style={{
            position: 'absolute',
            filter: current <= 0 && 'grayscale(100%)',
          }}
        />
        <Image
          alt="monte-olimpo"
          width={1100}
          height={600}
          src="/images/jornada/OLIMPO.png"
          style={{
            position: 'absolute',
            filter: current <= 1 ? 'grayscale(100%)' : 'saturate(2)',
          }}
        />
        <Image
          alt="monte-everest"
          width={1100}
          height={600}
          src="/images/jornada/EVEREST.png"
          style={{
            position: 'absolute',
            filter: current <= 2 && 'grayscale(100%)',
          }}
        />
        <Image
          alt="monte-k3"
          width={1100}
          height={600}
          src="/images/jornada/K2.png"
          style={{
            position: 'absolute',
            filter: current <= 3 && 'grayscale(100%)',
          }}
        />
      </Box>
      <Box
        width={785}
        height={210}
        ml="4rem"
        borderRadius={5}
        sx={{
          position: 'relative',
        }}
      >
        <Image
          alt="monte-fugi"
          src={Options[current].banner}
          style={{ objectFit: 'cover' }}
          fill
        />
        <Box
          width={785}
          height={210}
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            padding: '1.0rem',
          }}
        >
          <div>
            <Typography fontWeight="300">Você está no nível:</Typography>

            <Image
              alt="monte-fugi"
              width={220}
              height={150}
              src={Options[current].image}
              style={{
                objectFit: 'contain',
                flex: 1,
                padding: '0 1rem',
              }}
            />
          </div>
          <Box flex={2}>
            <Typography variant="h5" fontWeight="bold">
              {Options[current].name}
            </Typography>
            <Typography variant="body2">
              {Options[current].description}
            </Typography>
          </Box>
        </Box>
      </Box>
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
  const accesses = await CheckForSubscription({
    supabase,
    data: {
      user_id: session.user.id,
    },
  });

  const readOnly = isReadOnly(accesses);

  return {
    props: {
      accesses,
      readOnly,
    },
  };
};

export default Dashboard;
