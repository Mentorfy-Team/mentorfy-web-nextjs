import { clients_svg, home_svg, my_products_svg, settings_svg } from '~/../public/svgs';

export enum Routes {
  login = '/',
}

export const routes = {
  home: {
    path: '/dashboard',
    name: 'Dashboard',
    component: home_svg,
  },
  products: {
    path: '/produtos',
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
