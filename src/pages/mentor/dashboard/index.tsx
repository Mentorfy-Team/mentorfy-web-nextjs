import { default as DashboardLayout } from '~/layouts/mentor/dashboard';
import { getProps as getProps } from '~/layouts/mentor/dashboard';

export default DashboardLayout;

export const getServerSideProps = getProps;
