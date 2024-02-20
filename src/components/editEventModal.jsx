/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, Typography, Grid } from '@mui/material';
import { editEvent } from '../api/axios';

const editEventModal = ({ open, setOpen, event }) => {
  const [idEvent, setIdEvent] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [max, setMax] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !date || !max || !description) {
      alert('Todos los campos son obligatorios');

      return;
    }

    const form = {
      name,
      date,
      max,
      description,
    };
    await editEvent(idEvent, form);
    setOpen(false);
    return;
  };

  useEffect(() => {
    setIdEvent(event._id);
    setName(event.name);
    setDate(event.date);
    setMax(event.max);
    setDescription(event.description);
  }, [event]);

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
          <Grid container rowSpacing={1} columns={12}>
            <Grid item xs={8}>
              <Typography
                component="div"
                variant="h5"
                sx={{
                  color: '#B12687',
                  fontSize: '30px',
                  width: {
                    xs: '60vw',
                    md: '31.8vw',
                  },
                  fontWeight: {
                    xs: 300,
                    md: '2vh',
                  },
                }}
              >
                Edicion de evento
                {event.name}
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    value={name}
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    value={date}
                    type="date"
                    placeholder="date"
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                    onChange={(e) => setDate(e.target.value)}
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    type="number"
                    value={max}
                    min={0}
                    placeholder="max"
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                    onChange={(e) => setMax(e.target.value)}
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
                    height: '6.53wh',
                  }}
                >
                  <input
                    type="text"
                    value={description}
                    placeholder="description"
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid',
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
              </Typography>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                width: '31.8vw',
                height: '8wh',
                backgroundcolor: '#B12687',
                color: 'white',
                marginLeft: '20px',
                borderRadius: '100px',
              }}
            >
              Editar
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

export default editEventModal;
