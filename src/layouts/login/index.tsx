import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const LoginView = ({}): InferGetServerSidePropsType<typeof getProps> => (
  <div></div>
);

export const getProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default LoginView;
