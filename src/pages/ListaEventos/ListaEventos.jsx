import { useEffect, useState, useContext } from 'react';
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Typography,
  Container,
  Stack,
} from '@mui/material';
import AddParticipantModal from '../../components/newParticipantsModal';
import { getEvents, deleteEvent } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';
import EditEventModal from '../../components/editEventModal';

const ListaEventos = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(SessionContext);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState('');
  const [open, setOpen] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState('');

  const handleChange = async (event, value) => {
    await setPage(value);
    await setSkip((value - 1) * limit);
  };

  const handleEdit = async (row) => {
    await setEvent(row);
    setOpenEditEvent(true);
    return;
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    await fetchData();
    return;
  };

  const handleInvite = (id) => {
    setEvent(id);
    setOpen(true);
    return;
  };

  const handleShowList = (id) => {
    navigate(`/ListaParticipantes/${id}`);
  };

  const handleFilter = () => {
    setFilter(!filter);
    return;
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getEvents(limit, skip, search);
      setEvents(data.events);
      setCount(Math.ceil(data.total / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [openEditEvent, skip, search]);

  return (
    <Container
      sx={{
        width: '80%',
        minWidth: '75%',
        alignItems: 'flex-start',
        marginTop: '15vh',
        marginLeft: 'auto',
        position: 'sticky',
        top: '0',
        transform: 'translateX(-3%)',
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: '30vw',
            height: '50px',
            borderRadius: '100px',
          }}
          onClick={() => navigate('/newevent')}
        >
          Nuevo evento
        </Button>
        <Button
          variant="contained"
          color="white"
          size="large"
          sx={{
            width: '30vw',
            height: '50px',
            borderRadius: '100px',
            fontSize: '10px',
          }}
          onClick={handleFilter}
        >
          Filtra usuarios por sus datos
        </Button>
      </Stack>

      {filter && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            padding: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Ingrese el nombre del evento"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '30%',
              height: '40px',
              borderRadius: '10px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
              marginBottom: '10px',
            }}
          />
        </Stack>
      )}

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
        <TableContainer>
          <AddParticipantModal
            open={open}
            setOpen={setOpen}
            id={event}
            loading={loading}
            setLoading={setLoading}
          />
          <EditEventModal
            open={openEditEvent}
            setOpen={setOpenEditEvent}
            event={event}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Nombre
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Descripcion
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Fecha
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell
                    style={{
                      gap: 2,
                      display: 'flex',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{
                        color: '#FFFFFF', // White text color
                        borderRadius: '100px',
                        minWidth: '100px',
                        ontSize: '10px',
                      }}
                      onClick={() => handleInvite(row._id)}
                    >
                      Invitar
                    </Button>
                    <Button
                      variant="contained"
                      color="danger"
                      size="large"
                      style={{
                        color: '#FFFFFF', // White text color
                        borderRadius: '100px',
                        minWidth: '100px',
                        ontSize: '10px',
                      }}
                      onClick={() => handleDelete(row._id)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="contained"
                      color="edit"
                      style={{
                        color: '#FFFFFF', // White text color
                        borderRadius: '100px',
                        minWidth: '100px',
                        ontSize: '10px',
                      }}
                      onClick={() => handleEdit(row)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        color: '#FFFFFF',
                        borderRadius: '100px',
                        width: '100px',
                        fontSize: '10px',
                      }}
                      onClick={() => handleShowList(row._id)}
                    >
                      Participantes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography>Page: {page}</Typography>
          <Pagination count={count} page={page} onChange={handleChange} />
        </TableContainer>
      )}
    </Container>
  );
};

export default ListaEventos;
