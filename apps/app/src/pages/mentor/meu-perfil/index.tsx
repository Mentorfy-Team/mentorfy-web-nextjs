import { PageConfig } from 'next';
import { default as MyProfileLayout } from '@app/layouts/mentor/meu-perfil';
import { getProps as getProps } from '@app/layouts/mentor/meu-perfil';
export default MyProfileLayout;

export const getServerSideProps = getProps;

export const config: PageConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
