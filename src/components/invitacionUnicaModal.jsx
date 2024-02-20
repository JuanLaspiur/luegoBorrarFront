/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  Box,
  Button,
  Modal,
} from '@mui/material';
import { createInvitation } from '../api/axios';

const invitacionUnicaModal = ({ open, setOpen, id, loading, setLoading }) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || lastname === '' || email === '') {
      alert('Todos los campos son obligatorios');

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('El correo electrónico no es válido');
      return;
    }

    const form = {
      name,
      lastname,
      email,
      event: id,
    };
    setLoading(true);
    await createInvitation(form);
    setLoading(false);
    setOpen(false);
    return;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        position: 'absolute',
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100vw',
            justifyContent: 'space-around',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
              xs: '80.27vw',
              md: '36.27vw',
            },
            height: {
              xs: '65vh',
              md: '82.18vh',
            },
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '20px',
          }}
        >
          <form
            style={{
              width: '100%',
            }}
            onSubmit={handleSubmit}
          >
            <Grid
              container
              rowSpacing={1}
              columns={12}
              style={{
                marginTop: '20px',
              }}
            >
              <Grid item xs={8}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{
                    color: '#B12687',
                    fontSize: '30px',
                    padding: '10px',
                    width: {
                      xs: '60vw',
                      md: '31.8vw',
                    },
                    fontWeight: 700,
                  }}
                >
                  Invitación única
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: {
                        xs: '60vw',
                        md: '31.8vw',
                      },
                      height: '6.5vh',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Nombre"
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: {
                        xs: '60vw',
                        md: '31.8vw',
                      },
                      height: '6.5vh',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Apellido"
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography component="div" variant="h5">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: 2,
                      width: {
                        xs: '60vw',
                        md: '31.8vw',
                      },
                      height: '6.5vh',
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid',
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                </Typography>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: '31.8vw',
                  height: '6.5vh',
                  backgroundcolor: '#B12687',
                  color: 'white',
                  marginLeft: '20px',
                  borderRadius: '100px',
                }}
              >
                Invitar
              </Button>
            </Grid>
          </form>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      )}
    </Modal>
  );
};

export default invitacionUnicaModal;
