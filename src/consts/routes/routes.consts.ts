import {
  clients_svg,
  home_svg,
  my_products_svg,
  settings_svg,
} from '~/../public/svgs';

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
  settings = '/minha-conta',
}

export const routes = {
  home: {
    path: '/dashboard',
    name: 'Dashboard',
    component: home_svg,
  },
  products: {
    path: '/produtos',
    subpaths: ['/membros'],
    name: 'Produtos',
    component: my_products_svg,
  },
  clients: {
    path: '/clientes',
    name: 'Clientes',
    component: clients_svg,
  },
  settings: {
    path: '/perfil',
    name: 'Minha Conta',
    component: settings_svg,
  },
};
