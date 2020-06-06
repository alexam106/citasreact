import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }
  
  //Arreglo de citas, siempre hay que utilizar la funcion que modifca el state
  const [citas, guardarCitas] = useState([citasIniciales]);

  //Función que tome las citas actuales y agregue la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ]);
  }

//Use effect para realizar ciertas operciones cuando el state cambia
//siempre pasarle un arreglo vacio
//va a estar pendiente de ciertos cambios que sucedan con la aplicacio
//Es un array de dependencias
  useEffect( () => {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

     if(citasIniciales){
       localStorage.setItem('citas', JSON.stringify(citas))
     }else{
       localStorage.setItem('citas', JSON.stringify([]));
     }
  }, [citas] );

  //Función que elimina una cita por su id
  const eliminarCita = id => {
      const nuevasCitas = citas.filter(cita => cita.id !== id);
      guardarCitas(nuevasCitas);
  }

//en react se usa más map que foreach 

//mensaje condicional 
  console.log(citas.length);
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (

    <Fragment>

      <h1>Administrador de pacientes</h1>

      <div className="container">

        <div className="row">
          <div className="one-half column">
            
            <Formulario
              crearCita= {crearCita}
            />

          </div>
          <div className="one-half column">

          <h2>{titulo}</h2>
              {citas.map(cita => (
                  <Cita
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
              ))}

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
