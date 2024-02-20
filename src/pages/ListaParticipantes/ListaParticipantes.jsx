import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  CircularProgress,
  Typography,
  Pagination,
  Button,
  Stack,
  Select,
  MenuItem,
} from '@mui/material';
import { getInvitation, putInvitation } from '../../api/axios';
import { SessionContext } from '../../App';

const ListaParticipantes = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(SessionContext);
  const { id } = useParams();
  const [eventName, setEventName] = useState('');
  const [invitations, setInvitations] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchState, setSearchState] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getInvitation(
        id,
        limit,
        skip,
        searchName,
        searchEmail,
        searchState,
      );
      setInvitations(data.invitations);
      setEventName(data.eventName);
      setCount(Math.ceil(data.total / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event, value) => {
    setPage(value);
    setSkip((value - 1) * limit);
  };
  const handleconfirm = async (email) => {
    const form = {
      event: id,
      email,
    };

    await putInvitation(form);
    fetchData();
  };
  const handleFilter = () => {
    setFilter(!filter);
    return;
  };

  useEffect(() => {
    fetchData();
  }, [searchName, searchEmail, searchState]);
  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
        p: 3,
        width: '80vw',
        flexWrap: 'wrap',
      }}
    >
      <Typography>Lista de Participantes del evento : {eventName}</Typography>
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
          onClick={() => navigate('/events')}
        >
          lista de eventos
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
            placeholder="Ingrese el nombre del participante"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
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
          <input
            type="text"
            placeholder="Ingrese el correo del participante"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
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
          <Select
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
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
          >
            <MenuItem value={''}>Todas</MenuItem>
            <MenuItem value={'pending'}>Pendiente</MenuItem>
            <MenuItem value={'confirmed'}>Confirmado</MenuItem>
          </Select>
        </Stack>
      )}

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
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
                  Apellido
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Correo
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  state
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
              {invitations.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>
                    {row.state == 'pending' && (
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          style={{
                            color: '#FFFFFF',
                            borderRadius: '100px',
                            width: '117px',
                          }}
                          onClick={() => handleconfirm(row.email)}
                        >
                          Confirmar
                        </Button>
                        <Button
                          variant="contained"
                          color="edit"
                          style={{
                            color: '#FFFFFF', // White text color
                            borderRadius: '100px',
                            width: '117px',
                          }}
                          onClick={() => navigate(`/qrscan`)}
                        >
                          Escanear QR
                        </Button>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography>Page: {page}</Typography>
          <Pagination count={count} page={page} onChange={handleChange} />
        </TableContainer>
      )}
    </Box>
  );
};

export default ListaParticipantes;
