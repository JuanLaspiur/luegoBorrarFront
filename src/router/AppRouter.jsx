// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route } from 'react-router';
import routes from './routes';
import Login from '../pages/Login';
import EditProfile from '../pages/User/editProfile';
//import ListaEstablecimientos from '../pages/ListaEstablecimientos/ListaEstablecimientos';
import ListaEventos from '../pages/ListaEventos/ListaEventos';
import NewEvent from '../pages/NewEvent';
import Layout from '../layout/Layout';
import ListaUsuarios from '../pages/ListaUsuarios/ListaUsuarios';
import ListaParticipantes from '../pages/ListaParticipantes/ListaParticipantes';
//import Test from '../pages/test/test';
import QRscan from '../pages/QRscan/QRscan';



const AppRouter = () => {
  return (
    <Routes>
      {/*---------- Rutas sin logueo ----------*/}
      <Route exact path={routes.login} element={<Login />} />
      <Route element={<Layout />}>
        <Route path="" element={<ListaEventos />} />
        <Route exact path={routes.editProfile} element={<EditProfile />} />
        {/* <Route
          exact
          path={routes.establecimiento}
          element={<ListaEstablecimientos />}
        /> */}
        <Route exact path={routes.events} element={<ListaEventos />} />
        <Route exact path={routes.newEvent} element={<NewEvent />} />
        <Route exact path={routes.usuarios} element={<ListaUsuarios />} />
        <Route
          exact
          path={routes.ListaParticipantes}
          element={<ListaParticipantes />}
        />
        <Route exact path={routes.qrscan} element={<QRscan />} />
        {/* <Route exact path={routes.test} element={<Test />} /> */}
        <Route path="*" element={<ListaEventos />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
