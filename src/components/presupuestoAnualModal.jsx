/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Modal } from '@mui/material';

const presupuestoAnualModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado');
    return;
  };

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
          width: 658,
          height: 1032,
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
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              marginTop: '20px',
            }}
          >
            <Grid item xs={8}>
              <Typography
                component="div"
                variant="h5"
                style={{
                  color: '#B12687',
                  fontSize: '45px',
                  padding: '20px',
                  width: '577px',
                  fontWeight: 700,
                }}
              >
                Configuración Presupuesto Anual
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography component="div" variant="h5">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 2,
                    width: '577px',
                    height: '73px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Seleciona tipo de solicitud"
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
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
                    width: '577px',
                    height: '73px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Seleciona el año"
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
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
                    width: '577px',
                    height: '73px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Monto disponible "
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
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
                    width: '577px',
                    height: '73px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Cantidad de concejos"
                    style={{
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                  />
                </Box>
              </Typography>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                width: '577px',
                height: '77px',
                backgroundcolor: '#B12687',
                color: 'white',
                marginLeft: '20px',
                borderRadius: '100px',
              }}
            >
              Establecer presupuesto
            </Button>
          </Grid>
        </form>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default presupuestoAnualModal;
