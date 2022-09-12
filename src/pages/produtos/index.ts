import { default as ProdutosLayout } from '~/layouts/produtos';
import { getProps as getProps } from '~/layouts/produtos';

export default ProdutosLayout;

export const getServerSideProps = getProps;
