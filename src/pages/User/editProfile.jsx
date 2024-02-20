import { useState, useEffect, useContext } from 'react';
import { Button, Grid, Typography, Box, Container } from '@mui/material';
import { SessionContext } from '../../App';

export default function PermanentDrawerLeft() {
  const { userInfo } = useContext(SessionContext);
  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [email, setEmail] = useState('');
  const [run, setRun] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      lastName1 === '' ||
      lastName2 === '' ||
      email === '' ||
      run === '' ||
      userType === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    alert('Perfil actualizado');
    return;
  };

  const handleSignature = () => {
    alert('Firma digital seleccionada');
    return;
  };

  const handleChangePassword = () => {
    alert('Contraseña cambiada');
    return;
  };

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      setName(userInfo.name);
      setLastName1(userInfo.lastName1);
      setLastName2(userInfo.lastName2);
      setEmail(userInfo.email);
      setRun(userInfo.run);
      setUserType(userInfo.userType);
    }
  }, []);

  return (
    <Container
      sx={{
        width: '80%',
        minWidth: '75%',
        padding: '2rem',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            paragraph
            style={{
              color: '#B12687',
              textSizeAdjust: '36px',
              fontWeight: '400',
            }}
          >
            Selecciona tu firma digital
          </Typography>
          <Typography
            paragraph
            style={{
              textSizeAdjust: '36px',
              fontWeight: '400',
              fontSize: '1.6vw',
            }}
          >
            Selecciona tu firma digital. Recuerda los siguientes requisitos:
            Dimensiones 600x600 Pixeles 72 DPI formato JPG
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: 35,
              backgroundColor: '#B12687',
              padding: '4px 36px',
              width: '30vw',
              height: '73px',
              color: 'white',
              fontSize: '2vw',
            }}
            onClick={handleSignature}
          >
            Seleccionar firma
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: '30vw',
                      height: '73px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Seleciona tipo de usuario"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: '30vw',
                      height: '73px',
                    }}
                  >
                    <input
                      type="text"
                      value={name}
                      placeholder="Nombre de usuario"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: '30vw',
                      height: '73px',
                    }}
                  >
                    <input
                      type="text"
                      value={lastName1}
                      placeholder="Apellido paterno"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setLastName1(e.target.value)}
                      required
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: '30vw',
                      height: '73px',
                    }}
                  >
                    <input
                      type="text"
                      value={lastName2}
                      placeholder="Apellido materno"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setLastName2(e.target.value)}
                      required
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: '30vw',
                      height: '73px',
                    }}
                  >
                    <input
                      type="text"
                      value={run}
                      placeholder="RUN"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setRun(e.target.value)}
                      required
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: '30vw',
                      height: '73px',
                    }}
                  >
                    <input
                      type="text"
                      value={email}
                      placeholder="correo@corafam.cl"
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: '#B12687',
                    padding: '4px 36px',
                    width: '30vw',
                    height: '73px',
                    color: 'white',
                    fontSize: '2vw',
                  }}
                  onClick={handleChangePassword}
                >
                  Cambiar contraseña
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: '#B12687',
                    padding: '4px 36px',
                    width: '30vw',
                    height: '73px',
                    color: 'white',
                    borderRadius: '100px',
                    fontSize: '2vw',
                  }}
                  type="submit"
                >
                  Guardar cambios
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
