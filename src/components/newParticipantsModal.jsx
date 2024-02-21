/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Grid, Typography, Box, Button, Modal } from '@mui/material';
import InvitacionUnicaModal from './InvitacionUnicaModal';
import InvitacionMasivaModal from './invitacionMasivaModal';

const newParticipantsModal = ({ open, setOpen, id, loading, setLoading }) => {
  const [openInvididual, setOpenInvididual] = useState(false);
  const [openMasiva, setOpenMasiva] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
          sm={{
            width: '36.27vw',
            height: '82.18vh',
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columns={12}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              marginTop: '20px',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Typography
              component="div"
              variant="h6"
              sx={{
                color: '#B12687',
                fontSize: {
                  xs: '30px',
                  md: '4vh',
                },
                padding: '5px',
                width: {
                  xs: '90.27vw',
                  md: '31.8vw',
                },
                fontWeight: 700,
              }}
            >
              Invitación de Participantes
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: {
                  xs: '80vw',
                  md: '31.8vw',
                },
                height: '6.9vh',
                backgroundcolor: '#B12687',
                color: 'white',
                marginLeft: '20px',
                borderRadius: '100px',
              }}
              onClick={() => {
                setOpenInvididual(true), setOpen(false);
              }}
            >
              Unica
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: {
                  xs: '80vw',
                  md: '31.8vw',
                },
                height: '6.9vh',
                backgroundcolor: '#B12687',
                color: 'white',
                marginLeft: '20px',
                borderRadius: '100px',
              }}
              md={{
                width: '31.8vw',
              }}
              onClick={() => {
                setOpenMasiva(true), setOpen(false);
              }}
            >
              Masiva
            </Button>
          </Grid>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
      <InvitacionUnicaModal
        open={openInvididual}
        setOpen={setOpenInvididual}
        id={id}
        loading={loading}
        setLoading={setLoading}
      />
      <InvitacionMasivaModal
        open={openMasiva}
        setOpen={setOpenMasiva}
        id={id}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default newParticipantsModal;
