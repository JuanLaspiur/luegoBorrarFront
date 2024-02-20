// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import moment from 'moment';
// import "./styles/main.scss";

export const SessionContext = createContext();
const App = () => {
  const session = localStorage.getItem('user');

  const [isLogged, setIsLogged] = useState(session ? true : false);
  const [loading, setLoading] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY/MM/DD'));

  useEffect(() => {
    const session = localStorage.getItem('user');
      setUserInfo(session ? session : null);
      setIsLogged(session ? true : false);
  }, [isLogged]);

  const SessionProps = {
    loading,
    setLoading,
    isLogged,
    setIsLogged,
    currentDate,
    setCurrentDate,
    userInfo,
  };

  return (
    <BrowserRouter>
      <SessionContext.Provider value={{ ...SessionProps }}>
        <AppRouter />
      </SessionContext.Provider>
    </BrowserRouter>
  );
};

export default App;
