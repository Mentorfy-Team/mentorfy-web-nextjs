export enum Routes {
  login = '/',
}

export const routes = {
  home: {
    path: '/dashboard',
    name: 'Dashboard',
    icon: {
      path: '/svgs/home.svg',
      width: '32',
      height: '28',
    },
  },
  products: {
    path: '/produtos',
    name: 'Meus Produtos',
    icon: {
      path: '/svgs/my-products.svg',
      width: '32',
      height: '25.6',
    },
  },
  clients: {
    path: '/clientes',
    name: 'Meus Clientes',
    icon: {
      path: '/svgs/clients.svg',
      width: '32',
      height: '25.6',
    },
  },
  settings: {
    path: '/perfil',
    name: 'Minha Conta',
    icon: {
      path: '/svgs/settings.svg',
      width: '32',
      height: '25.6',
    },
  },
};
