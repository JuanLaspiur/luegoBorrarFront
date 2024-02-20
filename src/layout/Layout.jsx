import { CssBaseline, Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Drawer from './drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getPageTitle } from '../router/titles';
import { SessionContext } from '../App';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B12687',
    },
    secondary: {
      main: '#30EC20',
    },
    danger: {
      main: '#EC2038',
    },
    edit: {
      main: '#7E5CDF',
    },
    white: {
      main: '#FFFFFF',
    },
  },
});

const Layout = ({ ...rest }) => {
  const { userInfo, setIsLogged, isLogged } = useContext(SessionContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, location]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100%',
          position: 'relative',
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          backgroundcolor="primary.main"
          sx={{
            width: `80vw`,
            ml: `2vw`,
            // height: '170px',
            alignItems: 'end',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <Typography variant={'h10'} noWrap component="div">
              {getPageTitle(currentPath)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Drawer userInfo={userInfo} setIsLogged={setIsLogged} />
        {/* <Box component="main" sx={{ flexGrow: 1, p: 10 }}> */}
        <Outlet {...rest} />
        {/* </Box> */}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
