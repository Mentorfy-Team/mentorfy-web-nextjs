export enum ApiRoutes {
  //* Rotas para api de usuários
  users = '/api/users',
  users_profile = '/api/users/profile',

  //* Rotas para api de clientes
  clients = '/api/clients',
  clients_list = '/api/clients/list',

  //* Rotas para api de usuários
  products = '/api/products',
  products_list = '/api/products/list',
  products_update = '/api/products/update',

  //* Rotas para api de area de membros
  member_areas = '/api/member-areas',
  member_areas_list = '/api/member-areas/list',
  member_areas_tool = '/api/member-areas/tool',
  member_areas_tool_list = '/api/member-areas/tool/list',

  //* Rotas para api de autenticação
  auth = '/api/auth',
  auth_logout = '/api/auth/logout',
  auth_recover = '/api/auth/recover',
  auth_cookies = '/api/auth/cookies',
  auth_password_change = '/api/auth/password',

  //* Rotas para api de ferramentas do construtor
  mentor_tools_type = '/api/mentor-tool/list',

  //* Rotas para api de upload de arquivos
  upload = '/api/upload',
}
