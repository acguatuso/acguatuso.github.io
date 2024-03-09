import { useState, ChangeEvent } from 'react';
import Modal from 'react-modal';
import { uploadFirebaseImage } from "../../utils/uploadFirebaseImages/uploadFirebaseImages";

interface Horario {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

function GestionCursos() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nombreCurso, setNombreCurso] = useState('');
  const [descripcionCurso, setDescripcionCurso] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const [linkCurso, setLinkCurso] = useState('');
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [nuevoHorario, setNuevoHorario] = useState<Horario>({
    diaSemana: '',
    horaInicio: '',
    horaFin: '',
  });

  const handleModalidadChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setModalidad(e.target.value);
  };

  const handleNombreCursoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNombreCurso(e.target.value);
  };

  const handleDescripcionCursoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescripcionCurso(e.target.value);
  };

  const handleLinkCursoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkCurso(e.target.value);
  };

  const handleFechaInicioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fechaSeleccionada = e.target.value;
    setFechaInicio(new Date(fechaSeleccionada));
  };
  
  const handleFechaFinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fechaSeleccionada = e.target.value;
    setFechaFin(new Date(fechaSeleccionada));
  };

  const handleDiaSemanaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNuevoHorario({ ...nuevoHorario, diaSemana: e.target.value });
  };

  const handleHoraInicioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const horaSeleccionada = e.target.value;
    setNuevoHorario({ ...nuevoHorario, horaInicio: horaSeleccionada });
  };
  
  const handleHoraFinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const horaSeleccionada = e.target.value;
    setNuevoHorario({ ...nuevoHorario, horaFin: horaSeleccionada });
  };

  const agregarHorario = () => {
    setHorarios([...horarios, nuevoHorario]);
    setNuevoHorario({
      diaSemana: '',
      horaInicio: '',
      horaFin: '',
    });
    console.log(nuevoHorario)
  };

  function limpiarHorarios() {
    setHorarios([]);
  }

  function verHorarios() {
    console.log(horarios)
  }

  return (
    <>
      <h2>Gestión de Cursos</h2>
      <button onClick={() => setModalIsOpen(true)}>Crear un Nuevo Curso</button>
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        className="Modal"
      >
        <h2>Crear un Nuevo Curso</h2>
        <button className="ModalCloseButton" onClick={() => setModalIsOpen(false)}>X</button>
        <div className="ModalContent">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" value={nombreCurso} onChange={handleNombreCursoChange} id="nombre" name="nombre" placeholder='Nombre del curso' required/>  
            </div>
            <div>
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" value={descripcionCurso} onChange={handleDescripcionCursoChange} id="descripcion" name="descripcion" placeholder='Descripción del curso' required/>
            </div>
            <div>
                <label htmlFor="modalidad">Modalidad</label>
                <select id="modalidad" value={modalidad} onChange={handleModalidadChange} required>
                    <option disabled selected value="">Selecciona una modalidad</option>
                    <option value="presencial">Presencial</option>
                    <option value="virtual">Virtual</option>
                </select> 
            </div>
            <div>
              <label htmlFor="fechaInicio">Fecha de Inicio</label>
              <input
                type="date"
                id="fechaInicio"
                value={fechaInicio ? fechaInicio.toISOString().substring(0, 10) : ''}
                onChange={handleFechaInicioChange}
                required
              />
            </div>
            <div>
              <label htmlFor="fechaFin">Fecha de Fin</label>
              <input
                type="date"
                id="fechaFin"
                value={fechaFin ? fechaFin.toISOString().substring(0, 10) : ''}
                onChange={handleFechaFinChange}
                required
              />
            </div>
            <div>
                <label htmlFor="link-plat">Link de Clase</label>
                <input type="url" value={linkCurso} onChange={handleLinkCursoChange} id="link-plat" name="link-plat" />
            </div>
            <div>
              <label htmlFor="diaSemana">Día de la semana:</label>
              <select id="diaSemana" name="diaSemana" value={nuevoHorario.diaSemana} onChange={handleDiaSemanaChange} required>
                <option disabled value="">Selecciona un día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>
            <div>
              <label htmlFor="horaInicio">Hora de Inicio:</label>
              <input
                type="time"
                id="horaInicio"
                value={nuevoHorario.horaInicio}
                onChange={handleHoraInicioChange}
                required
              />
            </div>
            <div>
              <label htmlFor="horaFin">Hora de Fin:</label>
              <input
                type="time"
                id="horaFin"
                value={nuevoHorario.horaFin}
                onChange={handleHoraFinChange}
                required
              />
              <button onClick={agregarHorario}>Agregar Horario</button>
{/*               <button onClick={limpiarHorarios}>Limpiar Horarios</button>
 */}            </div>
            <div>
                  <label htmlFor="link-img">Link de Imagen Ilustrativa</label>
                  <input type="file" id="link-img" name="link-img" onChange={ (event) => uploadFirebaseImage(event.target.files![0], `${nombreCurso}/image1`)} />
            </div>
        </div>
        <button className='ModalSubmitButton' onClick={verHorarios}>Crear Curso</button>
      </Modal>

    </>
  );
}

export default GestionCursos;

