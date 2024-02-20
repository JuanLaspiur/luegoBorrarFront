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

import { SessionContext } from '../../App';
import { getEvstablishments, deleteEstablishment } from '../../api/axios';
import Modal from '../../components/newEstablecimientoModal';

const ListaEstablecimientos = () => {
  const { loading, setLoading } = useContext(SessionContext);
  const [establecimientos, setEstablecimientos] = useState([]);
  const [establecimiento, setEstablecimiento] = useState('');
  const [open, setOpen] = useState(false);
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
    await setEstablecimiento(row);
    setOpen(true);
    return;
  };
  const handleNewEstablecimiento = () => {
    setEstablecimiento('');
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteEstablishment(id);
    await fetchData();
    return;
  };

  const handleFilter = () => {
    setFilter(!filter);
    return;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getEvstablishments(limit, skip, search);
      setEstablecimientos(data.establishments);
      setCount(Math.ceil(data.total / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [open, skip, search]);

  return (
    <Container
      sx={{
        width: '80%',
        minWidth: '75%',
      }}
    >
      <Modal open={open} setOpen={setOpen} establecimiento={establecimiento} />
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
          onClick={() => handleNewEstablecimiento()}
        >
          Nuevo establecimiento
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
            placeholder="Ingrese el nombre del establecimiento"
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
                    fontSize: '20px',
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  Tipo de Establecimiento
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  Nombre
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {establecimientos.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundcolor: '#B12687',
                        width: '117px',
                        height: '36px',
                        borderRadius: '100px',
                        color: 'white',
                      }}
                      onClick={() => handleEdit(row)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="danger"
                      style={{
                        backgroundcolor: '#EC2038',
                        width: '117px',
                        height: '36px',
                        borderRadius: '100px',
                        color: 'white',
                      }}
                      onClick={() => handleDelete(row._id)}
                    >
                      Eliminar
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

export default ListaEstablecimientos;
