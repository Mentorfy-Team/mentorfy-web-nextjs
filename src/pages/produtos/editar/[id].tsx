import { default as EditarProdutosLayout } from '~/layouts/produtos/pages/editar-produto';
import {
  getStaticPaths as getPaths,
  getProps as getProps,
} from '~/layouts/produtos/pages/editar-produto';

export default EditarProdutosLayout;

export const getStaticProps = getProps;

export const getStaticPaths = getPaths;
