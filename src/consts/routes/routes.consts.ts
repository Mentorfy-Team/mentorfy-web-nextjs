import clients_svg from '~/../public/svgs/clients';
import home_svg from '~/../public/svgs/home';
import my_products_svg from '~/../public/svgs/my-products';
import settings_svg from '~/../public/svgs/settings';

export enum Routes {
  //* Rota de acesso inicial
  login = '/',

  //* Rota de acesso inicial
  home = '/dashboard',

  //* Rotas de produto
  products = '/produtos',
  products_edit = '/produtos/editar',

  //* Rotas de área de membros
  member_area = '/membros',

  //* Rotas de clientes
  clients = '/clientes',

  //* Rota de Perfil/Configurações do usuário
  settings = '/meu-perfil',
}

export const routes = {
  home: {
    path: Routes.home,
    name: 'Dashboard',
    component: home_svg,
  },
  products: {
    path: Routes.products,
    subpaths: [Routes.member_area],
    name: 'Produtos',
    component: my_products_svg,
  },
  clients: {
    path: Routes.clients,
    name: 'Clientes',
    component: clients_svg,
  },
  settings: {
    path: Routes.settings,
    name: 'Meu Perfil',
    component: settings_svg,
  },
};
