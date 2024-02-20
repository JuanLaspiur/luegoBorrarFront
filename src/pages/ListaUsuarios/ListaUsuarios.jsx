import { useEffect, useState, useContext } from 'react';
import {
  Typography,
  Pagination,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Container,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import NewUserModal from '../../components/newUserModal';
import { getUsers } from '../../api/axios';
import { SessionContext } from '../../App';

const ListaUsuarios = () => {
  const { loading, setLoading } = useContext(SessionContext);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchRole, setSearchRole] = useState('');

  const handleChange = (event, value) => {
    setPage(value);
    setSkip((value - 1) * limit);
  };

  const handleEdit = async (row) => {
    await setUser(row);
    setOpen(true);
  };
  const handleNewUser = () => {
    setUser('');
    setOpen(true);
  };
  const handleFilter = () => {
    setFilter(!filter);
    return;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUsers(
          limit,
          skip,
          searchName,
          searchEmail,
          searchRole,
        );
        setUsers(data.users);
        setCount(Math.ceil(data.total / limit));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [open, skip, searchName, searchEmail, searchRole]);

  return (
    <Container
      sx={{
        paddingTop: '50px',
        width: '80%',
        minWidth: '75%',
      }}
    >
      <NewUserModal open={open} setOpen={setOpen} user={user} />
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: '30vw',
            height: '50px',
            borderRadius: '100px',
            color: 'white',
          }}
          onClick={() => handleNewUser()}
        >
          Nuevo usuario
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
            placeholder="Ingrese el nombre del usuario"
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
            placeholder="Ingrese el correo del usuario"
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
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
            placeholder="Role"
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
            <MenuItem value={'ADMIN_ROLE'}>Administrador</MenuItem>
            <MenuItem value={'USER_ROLE'}>Usuario</MenuItem>
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
                  Ap Paterno
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Ap Materno
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Ciudad
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Role
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
              {users.map((row) => (
                <TableRow key={row.uid}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.lastname_father}</TableCell>
                  <TableCell>{row.lastname_mother}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
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

export default ListaUsuarios;
