const titles = {
  test: 'test',
  register: '/register',
  editprofile: 'Módulo usuario / Editar perfil',
  establecimientos: 'Módulo Administrador / Listado de establecimientos',
  events: 'Módulo Administrador / Listado de evetos',
  newevent: 'Módulo eventos/ Nuevo evento',
  usuarios: ' Usuarios',
  ListaParticipantes: 'Lista de participantes',
};

export const getPageTitle = (currentPath) => {
  currentPath = currentPath.replace('/', '');

  if (currentPath in titles) {
    return titles[currentPath];
  } else {
    return '';
  }
};
