import { useState, ChangeEvent } from 'react';
import { uploadFirebaseImage } from "../../utils/uploadFirebaseImages/uploadFirebaseImages";
import { addFirebaseDoc } from "../../utils/addFirebaseDoc/addFirebaseDoc";

function GestionCursos() {
  const [nombreCurso, setNombreCurso] = useState('');
  const [descripcionCurso, setDescripcionCurso] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const [linkCurso, setLinkCurso] = useState('');
  const [horario, setHorario] = useState('');
  const [fileImage, setFileImage] = useState<File>()
  const [mensajeExito, setMensajeExito] = useState('');

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

  const handleHorarioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHorario(e.target.value);
  };

  const handleCrearCurso = () => {
    const fechaCreacion = new Date();
    if(fileImage != null){
      uploadFirebaseImage(fileImage, `${nombreCurso}/image1`)
      setFileImage(undefined);
    }
    const cursoData = {
        nombre: nombreCurso,
        descripcion: descripcionCurso,
        modalidad: modalidad,
        fecha_inicio: fechaInicio?.toISOString(),
        fecha_finalizacion: fechaFin?.toISOString(),
        link_plataforma: linkCurso,
        horario: horario,
        fechaCreacion: fechaCreacion.toISOString(),
        image_url: `${nombreCurso}/`,
        aprobados: [],
        reprobados: [],
        matriculados: [],
        postulados: [],
        estado: 0,

    };
    addFirebaseDoc('Cursos', cursoData);

    // Después de enviar los datos, mostrar el mensaje de éxito
    setMensajeExito('El curso se ha creado con éxito.');

    // Limpiar el formulario y cerrar el modal después de unos segundos
    setTimeout(() => {
      setNombreCurso('');
      setDescripcionCurso('');
      setModalidad('');
      setFechaInicio(null);
      setFechaFin(null);
      setLinkCurso('');
      setHorario('');
      setMensajeExito('');
    }, 5000); // El mensaje de éxito se mostrará durante 5 segundos (5000 milisegundos)
};


  return (
    <>
      <h2>Gestión de Cursos</h2>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Crear un Nuevo Curso
      </button>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear un Nuevo Curso</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-start">
                <form action="">
                  <div className="row">
                    <div className="col">
                      <label className="form-label" htmlFor="nombre">Nombre</label>
                      <input type="text" className="form-control" id="nombre" name="nombre" value={nombreCurso} onChange={handleNombreCursoChange}  placeholder="Nombre del curso" required/>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="descripcion">Descripción</label>
                      <input type="text" className="form-control" id="descripcion" name="descripcion" value={descripcionCurso} onChange={handleDescripcionCursoChange} placeholder="Descripción del curso" required/>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="modalidad">Modalidad</label>
                      <select id="modalidad" className="form-select" name="modalidad" value={modalidad} onChange={handleModalidadChange} required>
                        <option disabled value="">Selecciona una modalidad</option>
                        <option value="presencial">Presencial</option>
                        <option value="virtual">Virtual</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="form-label" htmlFor="fechaInicio">Fecha de Inicio</label>
                      <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" value={fechaInicio ? fechaInicio.toISOString().substring(0, 10) : ''} onChange={handleFechaInicioChange} required/>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="fechaFin">Fecha de Fin</label>
                      <input type="date" className="form-control" id="fechaFin" name="fechaFin" value={fechaFin ? fechaFin.toISOString().substring(0, 10) : ''} onChange={handleFechaFinChange} required/>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="horario">Horario</label>
                      <input type="text" className="form-control" id="horario" name="horario" value={horario} onChange={handleHorarioChange}placeholder="Ej: Lunes: 8:00am - 9:00am" required/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="form-label" htmlFor="linkClase">Link de Clase</label>
                      <input type="url" className="form-control" id="linkClase" name="linkClase" value={linkCurso} onChange={handleLinkCursoChange}/>
                    </div>
                    <div className="col">
                      <label className="form-label" htmlFor="imagen">Imagen Ilustrativa</label>
                      <input type="file" className="form-control" id="imagen" name="imagen" onChange={ (event) => setFileImage(event.target.files![0])}/>
                    </div>
                  </div>
                </form>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-primary" onClick={handleCrearCurso} data-bs-dismiss="modal">Crear Curso</button>
            </div>
          </div>
        </div>
      </div>
       {/* Mensaje de éxito */}
       {mensajeExito && (
        <div className="alert alert-success" role="alert">
          {mensajeExito}
        </div>
      )}
    </>
  );
}

export default GestionCursos;

