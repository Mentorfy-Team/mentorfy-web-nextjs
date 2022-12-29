import { default as DashboardLayout } from '@app/layouts/mentor/dashboard';
import { getProps as getProps } from '@app/layouts/mentor/dashboard';

export default DashboardLayout;

export const getServerSideProps = getProps;
