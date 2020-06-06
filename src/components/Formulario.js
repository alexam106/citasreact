import React, {Fragment, useState} from 'react';
//import uuid from 'uuid/v4';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {

    //crear state de citas, esta funcion es la que modifica el state
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas:''
    });

    //Segundo state el primer valor es el nombre del state y el segundo lo la funcion que lo modifica
    const [error, actualizarError] = useState(false);


    //Funcion que se ejecuta cada que el usuario escribe en un input
    //leer lo que el usuario escribe y colocarlo en el state
    const actualizarState = e => {
        actualizarCita({
            ...cita, 
            [e.target.name] : e.target.value
        })
    }

    //extraer los valores
    const {mascota, propietario, fecha, hora, sintomas } = cita;

    //cuando el usuario presiona agregar cita prvent es para que no lo mande por el query string metodo get
    const submitCita = e =>{
        e.preventDefault();

        //Validar 
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''  || 
        hora.trim() === '' || sintomas.trim() === ''){
           actualizarError(true);
           return;
        }

        //Eliminar mensaje previo 
        actualizarError(false);

        //Asifnar un ID
        //cita.id = uuid();
        console.log(cita);

        //Crear la cita colocarla en el state principal
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas:''
        })
    }

 //dentro del return no se puede poner un if
    return ( 
        <Fragment>
            <h2>Crear citas</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
            : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}

                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar citas</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;