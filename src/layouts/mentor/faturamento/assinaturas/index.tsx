import { FC } from 'react';
import { TipText, TipWrapper } from '~/components/modules/TipBar/styles';
import Toolbar from '~/components/modules/Toolbar';
import { GetAuthSession } from '~/helpers/AuthSession';
import NextImage from 'next/image';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';

const Plans: FC<PageTypes.Props> = () => {
  return (
    <>
      <Toolbar tabs={['Gerienciamento de Assinatura']} />
      <ContentWidthLimit>
        <TipWrapper>
          <NextImage
            alt="tip-icon"
            src="/svgs/tip-icon.svg"
            width={22}
            height={22}
          />
          <TipText>Página em construção</TipText>
        </TipWrapper>
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
    props: {},
  };
};

export default Plans;
