// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { login } from '../../api/axios';
import { SessionContext } from '../../App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import CorafamLogo from '../../assets/CorafamLogo.jpg';
import pdichile from '../../assets/pdichile.jpg';

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

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLogged, isLogged } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const form = {
      email,
      password,
    };

    try {
      setLoading(true);
      setIsLogged(false);
      const response = await login(form);

      if (!response) {
        enqueueSnackbar('Contraseña o usuario incorrectos', {
          variant: 'error',
        });
        alert('Contraseña o usuario incorrectos');
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Error al iniciar sesión');
      console.error('Error during login:', error);

      setIsLogged(false);
    }
  };

  //check if login
  useEffect(() => {
    if (isLogged) {
      navigate('/events');
    } else {
      localStorage.clear();
    }
  }, [isLogged, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <Avatar
          alt="pdichile"
          src={pdichile}
          variant="rounded"
          sx={{
            width: '50vw',
            height: '105vh',
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Stack
          direction="column"
          spacing={10}
          sx={{
            width: {
              sm: '100vw',
              md: '50vw',
            },
          }}
        >
          <Card>
            <CardContent
              sx={{
                flex: '1',
                textAlign: 'center',
                justifyContent: 'space-evenly',
                minHeight: '100vh',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: {
                  xs: '20px',
                },
                width: {
                  xs: '85vw',
                  md: '40vw',
                },
              }}
            >
              <Avatar
                sx={{
                  width: {
                    xs: '30vw',
                    md: '15vw',
                  },
                  height: {
                    xs: '30vw',
                    md: '15vw',
                  },
                  alignSelf: 'center',
                }}
                alt="codafamlogo"
                src={CorafamLogo}
                variant="square"
              />
              {loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Typography component="div" variant="h5">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 2,
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        style={{
                          height: '30px',
                          borderRadius: '10px',
                          padding: '10px',
                        }}
                      />
                    </Box>
                  </Typography>
                  <Typography component="div" variant="h5">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 2,
                      }}
                    >
                      <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        style={{
                          height: '30px',
                          borderRadius: '10px',
                          padding: '10px',
                        }}
                      />
                    </Box>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: 35,
                      backgroundcolor: '#B12687',
                      padding: '4px 30px',
                      color: 'white',
                      height: '55px',
                      marginBottom:'10px'
                    }}
                    type="submit"
                  >
                    Iniciar sesión
                  </Button>
                  <Typography component="div" >
                    ¿Olvidaste la contraseña?
                  </Typography>
                </form>
              )}
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default LoginPage;
