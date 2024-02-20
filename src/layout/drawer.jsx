import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Avatar,
  Drawer,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { SlArrowDown } from 'react-icons/sl';
import CorafamLogo from '../assets/CorafamLogo.jpg';
const drawer = ({ userInfo, setIsLogged }) => {
  const handleLogout = () => {
    localStorage.clear();
    setIsLogged(false);
  };
  return (
    <Drawer
      sx={{
        width: {
          xs: '40vw',
          md: '25vw',
        },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: {
            xs: '35vw',
            md: '25vw',
          },
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
      style={{
        padding: '10px',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: '30px',
          paddingLeft: {
            xs: '20px',
            md: '0px',
          },
          paddingRight: {
            xs: '20px',
            md: '0px',
          },
          borderRight: '1px solid #e0e0e0',
        }}
      >
        <Stack>
          {' '}
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Avatar
              sx={{
                width: {
                  xs: '11vw',
                  md: '11vw',
                },
                height: {
                  xs: '11vw',
                  md: '11vw',
                },
                alignSelf: 'center',
              }}
              alt="codafamlogo"
              src={CorafamLogo}
              variant="square"
            />
          </Stack>
          <Typography
            style={{
              paddingTop: '30px',
              paddingLeft: '10px',
            }}
          >
            Bienvenido {userInfo ? userInfo.name : 'Nombre usuario'}
          </Typography>
          <List>
            {[
              // { text: 'editar perfil', link: '/editprofile' },
              { text: 'Cerrar session', link: '/login', onClick: handleLogout },
            ].map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  width: {
                    xs: '80%',
                    md: '100%',
                  },
                  fontSize: {
                    xs: '6px',
                    md: '16px',
                  },
                }}
              >
                <ListItemButton
                  component={Link}
                  to={item.link || '#'}
                  onClick={item.onClick}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Accordion
            sx={{
              backgroundcolor: 'transparent',
              border: '1px solid transparent', // Set the border to transparent
              borderRadius: '8px', // Adjust the border-radius as needed
              boxShadow: 'none', // Remove default box shadow
            }}
          >
            <AccordionSummary
              expandIcon={<SlArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  width: {
                    xs: '50%',
                    md: '100%',
                  },
                  fontSize: {
                    xs: '12px',
                    md: '16px',
                  },
                  paddingRight: '10px',
                }}
              >
                Modulo Administrador
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {[
                { text: 'Dashboard', link: '/events' },
                // { text: 'Presupuesto anual', link: '/events' },
                { text: 'Listado de usuarios', link: '/usuarios' },
                // {
                //   text: 'Listados de establecimientos',
                //   link: '/establecimientos',
                // },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.link || '#'}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              backgroundcolor: 'transparent',
              border: '1px solid transparent', // Set the border to transparent
              borderRadius: '8px', // Adjust the border-radius as needed
              boxShadow: 'none', // Remove default box shadow
            }}
          >
            <AccordionSummary
              expandIcon={<SlArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  width: {
                    xs: '70%',
                    md: '100%',
                  },
                  fontSize: {
                    xs: '12px',
                    md: '16px',
                  },
                }}
              >
                Modulo Eventos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {[
                { text: 'Todos los eventos', link: '/events' },
                { text: 'Nuevo evento', link: '/newevent' },
                // { text: 'Listados de participantes', link: '/events' },
                { text: 'Scanear QR', link: '/qrscan' },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.link || '#'}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion>
          {/* <Accordion
            sx={{
              backgroundcolor: 'transparent',
              border: '1px solid transparent', // Set the border to transparent
              borderRadius: '8px', // Adjust the border-radius as needed
              boxShadow: 'none', // Remove default box shadow
            }}
          >
            <AccordionSummary
              expandIcon={<SlArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  width: {
                    xs: '70%',
                    md: '100%',
                  },
                  fontSize: {
                    xs: '12px',
                    md: '16px',
                  },
                }}
              >
                Modulo de funcionarios
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {[
                { text: 'Nuevo funcionario', link: '/events' },
                { text: 'Listado de funcionarios', link: '/events' },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.link || '#'}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion> */}
          {/* <Accordion
            sx={{
              backgroundcolor: 'transparent',
              border: '1px solid transparent', // Set the border to transparent
              borderRadius: '8px', // Adjust the border-radius as needed
              boxShadow: 'none', // Remove default box shadow
            }}
          >
            <AccordionSummary
              expandIcon={<SlArrowDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  width: {
                    xs: '70%',
                    md: '100%',
                  },
                  fontSize: {
                    xs: '12px',
                    md: '16px',
                  },
                }}
              >
                Modulo Ayuda
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {['Nuevo funcionario', 'Listado de funcionarios'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion> */}
        </Stack>

        <Typography>Corafam App v1.0</Typography>
      </Stack>
    </Drawer>
  );
};

export default drawer;
