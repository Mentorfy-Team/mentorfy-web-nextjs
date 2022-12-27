import clients_svg from '~/../public/svgs/clients';
import graduationcap_svg from '~/../public/svgs/graduation-cap';
import home_svg from '~/../public/svgs/home';
import invoice_svg from '~/../public/svgs/invoice';
import rocket_svg from '~/../public/svgs/rocket';
import settings_svg from '~/../public/svgs/settings';

export enum PublicRoutes {
  //* Rota de acesso inicial
  login = '/',
}

export enum MentorRoutes {
  //* Rota de acesso inicial
  home = '/mentor/dashboard',

  //* Rotas de produto
  //products = '/mentor/produtos',
  products_edit = '/mentor/produtos/editar',

  //* Rotas de área de membros
  members_area = '/mentor/area-de-membros',
  members_area_editar = '/mentor/area-de-membros/editar',

  //* Rotas de clientes
  clients = '/mentor/clientes',

  //* Rota de Perfil/Configurações do usuário
  settings = '/mentor/meu-perfil',

  invoice = '/mentor/faturamento',
  products = '/mentor/faturamento/produtos',
  plans = '/mentor/faturamento/assinaturas',
  sells = '/mentor/faturamento/vendas',
  pocket = '/mentor/faturamento/carteira',

  evolution = '/mentor/minha-evolucao',
}

export enum MentoredRoutes {
  //* Rotas de produto
  home = '/mentorado/bem-vindo',

  kanban = '/mentorado/kanban',

  video_view = '/mentorado/curso-online',

  //* Rota de Perfil/Configurações do usuário
  settings = '/mentorado/meu-perfil',
}

type MentorMenuProps = {
  [root: string]: {
    path: string;
    name: string;
    component?: (props) => JSX.Element;
    inDevelopment?: boolean;
    children?: {
      path: string;
      name: string;
      inDevelopment?: boolean;
    }[];
  };
};

export const MentorMenu: MentorMenuProps = {
  home: {
    path: MentorRoutes.home,
    name: 'Dashboard',
    component: home_svg,
  },
  // products: {
  //   path: MentorRoutes.products,
  //   name: 'Produtos',
  //   component: my_products_svg,
  // },
  members_area: {
    path: MentorRoutes.members_area,
    name: 'Área de membros',
    component: graduationcap_svg,
  },
  clients: {
    path: MentorRoutes.clients,
    name: 'Clientes',
    component: clients_svg,
  },
  evolution: {
    path: MentorRoutes.evolution,
    name: 'Minha Evolução',
    component: rocket_svg,
    inDevelopment: true,
  },
  invoice: {
    path: MentorRoutes.invoice,
    name: 'Faturamento',
    component: invoice_svg,
    children: [
      {
        path: MentorRoutes.products,
        name: 'Produtos',
        inDevelopment: true,
      },
      {
        path: MentorRoutes.plans,
        name: 'Assinaturas',
        inDevelopment: true,
      },
      {
        path: MentorRoutes.sells,
        name: 'Vendas',
        inDevelopment: true,
      },
      {
        path: MentorRoutes.pocket,
        name: 'Carteira',
        inDevelopment: true,
      },
    ],
  },
  settings: {
    path: MentorRoutes.settings,
    name: 'Minha Conta',
    component: settings_svg,
  },
};

export const MentoredMenu = {
  home: {
    path: MentoredRoutes.home,
    name: 'Meus Produtos',
    component: home_svg,
  },
  settings: {
    path: MentoredRoutes.settings,
    name: 'Minha Conta',
    component: settings_svg,
  },
};
