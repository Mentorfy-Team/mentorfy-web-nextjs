import { default as MembrosLayout } from '~/layouts/membros';
import {
  getStaticPaths as getPaths,
  getProps as getProps,
} from '~/layouts/membros';

export default MembrosLayout;

export const getStaticProps = getProps;

export const getStaticPaths = getPaths;
