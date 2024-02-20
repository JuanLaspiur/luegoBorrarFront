/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Box,
  Modal,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { postEstablishment, editEstablishment } from '../api/axios';

const newEstablecimientoModal = ({ open, setOpen, establecimiento }) => {
  const [idEstablecimiento, setIdEstablecimiento] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [establishmentId, setEstablishmentId] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !type) {
      alert('Por favor, complete todos los campos');
      return;
    }
    const form = {
      name,
      type,
    };
    if (establishmentId) {
      await editEstablishment(establishmentId, form);
    } else {
      await postEstablishment(form);
    }
    setName('');
    setType('');
    setOpen(false);
  };
  useEffect(() => {
    if (establecimiento) {
      setEstablishmentId(establecimiento._id);
      setName(establecimiento.name);
      setType(establecimiento.type);
    } else {
      setIdEstablecimiento('');
      setName('');
      setType('');
    }
  }, [establecimiento]);

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
            xs: '80vw',
            md: '36.27vw',
          },
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: '20px',
          justifyContent: 'center',
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
            {establecimiento
              ? 'Edicion de establecimiento'
              : 'Configuración Nuevo establecimiento'}
          </Typography>
          <Grid container columns={12} columnSpacing={2}>
            {/* <Grid item xs={8}>
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
                    placeholder="Ingrese ID del establecimiento"
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                    required
                    onChange={(e) => setIdEstablecimiento(e.target.value)}
                    value={idEstablecimiento}
                  />
                </Box>
              </Typography>
            </Grid> */}
            <Grid item xs={8}>
              <InputLabel id="role-label">Tipo</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                value={type}
                label="Role"
                onChange={(e) => setType(e.target.value)}
                sx={{
                  width: {
                    xs: '60vw',
                    md: '31.8vw',
                  },
                  margin: '10px',
                }}
              >
                <MenuItem value={'ADMIN'}>Admin</MenuItem>
                <MenuItem value={'COUNTER'}>Contador</MenuItem>
              </Select>
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nombre establecimiento"
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Box>
              </Typography>
            </Grid>

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
              {establecimiento ? 'Editar' : 'Nuevo establecimiento'}
            </Button>
          </Grid>
        </form>
        <Button onClick={handleClose} sx={{ marginTop: '10px' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default newEstablecimientoModal;
