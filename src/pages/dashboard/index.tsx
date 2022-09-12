import { default as DashboardLayout } from '~/layouts/dashboard';
import { getProps as getProps } from '~/layouts/dashboard';

export default DashboardLayout;

export const getServerSideProps = getProps;
