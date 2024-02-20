/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { createInvitationByExcel } from '../api/axios';
import {
  Stack,
  CircularProgress,
  Box,
  Button,
  Modal,
  Typography,
} from '@mui/material';

const invitacionMasivaModal = ({ open, setOpen, id, loading, setLoading }) => {
  const [files, setFiles] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('No se han cargado archivos');
      return;
    }
    setLoading(true);
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    await createInvitationByExcel(id, formData);
    setLoading(false);
    setOpen(false);
    return;
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    const fil = e.target.files;
    const filesArray = Array.from(fil);
    const uniqueFiles = filesArray.filter(
      (file) => !files.some((existingFile) => existingFile.name === file.name),
    );

    setFiles([...files, ...uniqueFiles]);
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
            <Stack spacing={2} direction="column">
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
                    xs: '80vw',
                    md: '31.8vw',
                  },
                  fontWeight: 700,
                }}
              >
                Invitación masiva
              </Typography>

              <Button
                component="label"
                variant="contained"
                // startIcon={<CloudUploadIcon />}
                sx={{
                  width: {
                    xs: '60vw',
                    md: '31.8vw',
                  },
                  height: '6.9vh',
                  backgroundcolor: '#B12687',
                  color: 'white',
                  marginLeft: '20px',
                  borderRadius: '100px',
                }}
                onChange={handleFileChange}
              >
                Subir archivo
                <VisuallyHiddenInput type="file" />
              </Button>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <Button
                      onClick={() => {
                        const updatedFiles = files.filter(
                          (f, i) => i !== index,
                        );
                        setFiles(updatedFiles);
                      }}
                    >
                      x
                    </Button>
                  </li>
                ))}
              </ul>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: {
                    xs: '60vw',
                    md: '31.8vw',
                  },
                  height: '6.9vh',
                  backgroundcolor: '#B12687',
                  color: 'white',
                  marginLeft: '20px',
                  borderRadius: '100px',
                }}
              >
                Invitar a todos
              </Button>
            </Stack>
          </form>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      )}
    </Modal>
  );
};

export default invitacionMasivaModal;
