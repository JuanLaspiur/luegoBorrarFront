/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, Modal } from '@mui/material';
import { createUser, editUser } from '../api/axios';

const NewUserModal = ({ open, setOpen, user }) => {
  const [name, setName] = useState('');
  const [lastname_father, setLastName] = useState('');
  const [lastname_mother, setLastName2] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPassword2] = useState('');
  const [userId, setUserId] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !lastname_father || !lastname_mother) {
      alert('Por favor llene todos los campos');
      return;
    }

    if (!user) {
      if (!password || !confirmPassword) {
        alert('Por favor llene todos los campos');
        return;
      }

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }

    const form = {
      name,
      lastname_father,
      lastname_mother,
      email,
      password,
      newPass: confirmPassword,
    };

    if (userId) {
      await editUser(userId, form);
    } else {
      await createUser(form);
    }

    setName('');
    setLastName('');
    setLastName2('');
    setEmail('');
    setPassword('');
    setPassword2('');
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLastName(user.lastname_father);
      setLastName2(user.lastname_mother);
      setEmail(user.email);
      setUserId(user.uid);
    } else {
      setName('');
      setLastName('');
      setLastName2('');
      setEmail('');
      setUserId('');
    }
  }, [user]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
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
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: '20px',
          alignItems: 'center',
        }}
      >
        <form
          style={{
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          <Typography
            component="div"
            variant="h5"
            sx={{
              color: '#B12687',
              fontSize: '1.5rem',
              width: {
                xs: '60vw',
                md: '31.8vw',
              },
              fontWeight: 700,
              marginBottom: '20px',
            }}
          >
            {user ? 'Editar usuario' : 'Formulario nuevo usuario'}
          </Typography>
          <Grid container columns={12} columnSpacing={2}>
            {/* <Grid item xs={12}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    width: {
                      xs: '60vw',
                      md: '31.8vw',
                    },
                    margin:'10px'
                  }}
                >
                  <MenuItem value={'ADMIN_ROLE'}>Admin</MenuItem>
                  <MenuItem value={'USER_ROLE'}>User</MenuItem>
                </Select>
              </Grid> */}
            <Grid item xs={12}>
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    type="text"
                    value={name}
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
            <Grid item xs={12}>
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    type="text"
                    value={lastname_father}
                    placeholder="Apellido Paterno"
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    type="text"
                    value={lastname_mother}
                    placeholder="Apellido Materno"
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                    onChange={(e) => setLastName2(e.target.value)}
                  />
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    type="text"
                    value={email}
                    placeholder="Correo Electrónico"
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
            {user ? null : (
              <>
                <Grid item xs={12}>
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
                        height: '6.53wh',
                      }}
                    >
                      <input
                        type="password"
                        placeholder="Contraseña"
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          border: '1px solid',
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
                        height: '6.53wh',
                      }}
                    >
                      <input
                        type="password"
                        placeholder="Repita la Contraseña"
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          border: '1px solid',
                        }}
                        onChange={(e) => setPassword2(e.target.value)}
                      />
                    </Box>
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: {
                    xs: '60vw',
                    md: '31.8vw',
                  },
                  padding: '15px',
                  background: '#B12687',
                  color: 'white',
                  borderRadius: '10px',
                }}
              >
                {user ? 'Editar' : 'Registro de usuario'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button onClick={handleClose} style={{ marginTop: '10px' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default NewUserModal;
