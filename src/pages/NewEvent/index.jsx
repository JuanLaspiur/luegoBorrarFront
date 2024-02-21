import { useState, useContext, useEffect } from 'react';
import {
  CardContent,
  Button,
  Card,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { postEvent, createInvitationByExcel, sendInvitation } from '../../api/axios';
import { SessionContext } from '../../App';
import { Await, useNavigate } from 'react-router-dom';

const NewEvent = () => {
  const { loading, setLoading } = useContext(SessionContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [max, setParticipantes] = useState('');
  const [files, setFiles] = useState([]);
//constantes de Juancito
const [isChecked, setIsChecked] = useState(false);
const [nombreDOM, setNombreDOM ] = useState("") 
const [apellidoDOM, setApellidoDOM] = useState("");
const [emailDOM, setEmailDOM] = useState("");


  const handleSubmit = async (e) => {       
    
     e.preventDefault(); 
     
      if (name === '' || description === '' || date === '' || max === '') {
          alert('Todos los campos son obligatorios'); // Muestra una alerta si algún campo está vacío
          return; 
      }  
      setLoading(true); // Establece el estado de 'loading' como verdadero
  
      let  newEevent = await eventCreateReact();
      console.log("newEevent.event._id ::" +newEevent.event._id);
      
      if (!isChecked) { // Verifica si isChecked es falso
  
      // Verifica si hay archivos seleccionados
        if (files.length != 0) {
          // Obtiene el primer archivo de la lista de archivos
          const file = files[0];
          const formData = new FormData(); // Crea un nuevo objeto FormData
          formData.append('file', file); // Agrega el archivo al objeto FormData
  
          // Realiza una solicitud para crear invitaciones basadas en el archivo Excel
          await createInvitationByExcel(newEevent.event._id, formData);
        }
        clearAndNavigate();
      
      }else{
     /* if (name === '' || description === '' || date === '' || nombreDOM === '' || apellidoDOM === '' || emailDOM === '') {
      alert('Todos los campos son obligatorios');
      return;   
      } */
  
     await sendInvitation(newEevent.event._id, nombreDOM, apellidoDOM, emailDOM);
   
    clearAndNavigate();
  }

 
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


  /* Funcion juancito */
  const handleCheckboxChange=(e)=>{
    setParticipantes('1');
    setIsChecked(e.target.checked);
  }



  const clearAndNavigate=()=>{
    setName('');
    setDescription('');
    setDate('');
    setParticipantes('');
    setEmailDOM('');
    setApellidoDOM('')
    setNombreDOM('')
    setFiles([]);
    setLoading(false);
    navigate('/events');
  }

  const eventCreateReact=async()=>{
       // Crea un objeto 'form' con los datos del evento
     if(max === 0 || !max){
       setParticipantes('1');
      }

       const form = {
        name,
        description,
        date,
        max,
    };
    console.log(form);

    // Realiza una solicitud POST para crear un nuevo evento en el servidor
    return await postEvent(form);
  }
  
  useEffect(()=>{},[max]);
  return (
    <div>
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
        <form
          style={{
            flex: 'auto',
            flexDirection: 'column',
            gap: '30px',
            justifyContent: 'space-between',
            width: '70vw',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '70px',
          }}
          onSubmit={handleSubmit}
        >
          <Card>
            <Typography
              component="div"
              variant="h4"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: '10.54vh',
                padding: '10px 10px 10px 30px',
                fontSize: {
                  xs: '1.5rem',
                  sm: '2.3rem',
                },
                backgroundColor: 'primary.main',
                color: 'white',
              }}
            >
              Datos generales
            </Typography>
            <CardContent> 
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                style={{
                  marginTop: '20px',
                  width: '75vw',
                }}
              >
                <Grid
                  item
                  xs={6}
                  style={{
                    justifyContent: 'space-evenly',
                    width: '100vw',
                  }}
                >
                  <Typography component="div" variant="h5"> 
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 2,
                        width: '35vw',
                        height: '73px',
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Nombre del evento"
                        style={{
                          padding: '10px 10px 10px 20px',
                          borderRadius: '10px',
                          border: '1px solid',
                        }}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Box>
                  </Typography>
                  <Typography component="div" variant="h5">
                    <Typography
                      sx={{
                        padding: '10px 10px 10px 20px',
                      }}
                    >
                      Fecha del evento
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 2,
                        width: '35vw',
                        height: '73px',
                      }}
                    >
                      <input
                        type="date"
                        placeholder="fecha"
                        style={{
                          padding: '10px 10px 10px 20px',
                          borderRadius: '10px',
                          border: '1px solid',
                        }}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Box>
                  </Typography>
  
                <Box>
                  
                <p style={{fontSize:'15px'}}>Invitación unica</p>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                </Box>
      

                  {!isChecked && (
  <Typography component="div" variant="h5">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 2,
        width: '35vw',
        height: '73px',
      }}
    >
      <input
        type="number"
        min={0}
        placeholder="Participantes Maximos"
        style={{
          padding: '10px 10px 10px 20px',
          borderRadius: '10px',
          border: '1px solid',
        }}
        onChange={(e) => setParticipantes(e.target.value)}
      />
    </Box>

    <Typography component="div" variant="h5">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 2,
          width: '32.35vw',
          height: '3.94vh',
          color: '#B12687',
          fontSize: {
            xs: '1.5vh',
            md: '3.22vh',
          },
          fontWeight: '700',
          paddingBottom: '20px',
        }}
      >
        Carga de Invitados
      </Box>
    </Typography>

    <Typography component="div" variant="h5">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 2,
          width: '31.8vw',
          height: '6.54vh',
          fontSize: {
            xs: '1.5vh',
            md: '3.22vh',
          },
        }}
      >
        Sube documentos Excel de hasta 5 mb
      </Box>
    </Typography>

    <input
      type="file"
      style={{
        padding: '10px 10px 10px 20px',
        borderRadius: '10px',
        border: '1px solid',
        backgroundcolor: '#B12687',
        color: 'white',
      }}
      onChange={handleFileChange}
      multiple
    />

    <ul>
      {files.map((file, index) => (
        <li
          key={index}
          //backgroud pink
          style={{
            padding: '10px 10px 10px 20px',
            borderRadius: '10px',
            border: '1px solid',
            backgroundColor: '#EFA1D7',
            color: 'white',
            width: '14vw',
          }}
        >
          {file.name} 
          <Button
            style={{
              width: '1vw',
              height: '1vh',
            }}
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
  </Typography>
                  )}

                  {isChecked &&(  <>
    <input
      type="text"
      placeholder="Nombre"
      style={{
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid',
        marginBottom: '10px',  
        marginTop: '10px',           
      }}
      className='nombreInput'
      onChange={(e) => setNombreDOM(e.target.value)}
    />
       <input
      type="text"
      placeholder="Apellido"
      style={{
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid', 
        marginRight: '150px',
        marginTop: '10px',       

      }}
      className='apellidoInput'
      onChange={(e) => setApellidoDOM(e.target.value)}
    /> 
    <input
      type="text"
      placeholder="Email"
      style={{
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid',
        marginTop: '10px',  
        width:'450px'     
      }}
      className='emailInput'
      onChange={(e) => setEmailDOM(e.target.value)}
    />
  </>
)}
                </Grid>

                <Grid item xs={6}>
                  <Typography component="div" variant="h5"> 
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 2,
                        width: {
                          xs: '18vw',
                          md: '25vw',
                        },
                        height: '73px',
                        minHeight: '300px',
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Descripcion"
                        style={{
                          flex: 1,
                          alignContent: 'center',
                        }}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundcolor: 'primary.main',
              width: '32.85vw',
              height: '6.89vh',
              borderRadius: '100px',
              color: 'white',
              fontSize: {
                xs: '1.5vh',
                md: '3.22vh',
              },
              marginTop: '20px',
            }}
            type="submit"
          >
            Nuevo evento
          </Button>
        </form>
      )}
    </div>
  );
};

export default NewEvent;
