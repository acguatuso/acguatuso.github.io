import { useState, ChangeEvent, useEffect } from 'react';
import { addFirebaseDoc } from "../../api/addFirebaseDoc/addFirebaseDoc";
import { updateFirebaseDoc } from '../../api/updateFirebaseDoc/updateFirebaseDoc';
import { Curso } from './curso.interface';
import './CursosMain.css'
import { uploadFirebaseImage } from '../../api/uploadFirebaseImage/uploadFirebaseImage';

interface formProps{
    id: string
    titulo: string
    nombreButton: string | JSX.Element;
    styleButton: string
    submitButton: string
    curso: Curso | null
}

export const FormularioCursos = (props: formProps) => {
    const [nombreCurso, setNombreCurso] = useState('');
    const [descripcionCurso, setDescripcionCurso] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
    const [fechaFin, setFechaFin] = useState<Date | null>(null);
    const [linkCurso, setLinkCurso] = useState('');
    const [horario, setHorario] = useState('');
    const [fileImage, setFileImage] = useState<File>()
    const [mensajeExito, setMensajeExito] = useState('');

    useEffect(() => {
        if (props.curso !== null) {
            setNombreCurso(props.curso.nombre);
            setDescripcionCurso(props.curso.descripcion);
            setModalidad(props.curso.modalidad);
            setFechaInicio(props.curso.fecha_inicio.toDate());
            setFechaFin(props.curso.fecha_finalizacion.toDate());
            setLinkCurso(props.curso.link_plataforma);
            setHorario(props.curso.horario);
        }
    }, [props.curso]);
   
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
        uploadFirebaseImage(fileImage, `/Cursos/${nombreCurso}/image1`)
        setFileImage(undefined);
      }
      const cursoData = {
          nombre: nombreCurso,
          descripcion: descripcionCurso,
          modalidad: modalidad,
          fecha_inicio: fechaInicio,
          fecha_finalizacion: fechaFin,
          link_plataforma: linkCurso,
          horario: horario,
          fechaCreacion: fechaCreacion,
          image_url: `/Cursos/${nombreCurso}/`,
          aprobados: [],
          reprobados: [],
          matriculados: [],
          postulados: [],
          estado: 0,
  
      };
      addFirebaseDoc('Cursos', cursoData);
  
      // Después de enviar los datos, mostrar el mensaje de éxito
      setMensajeExito("Curso agregado con éxito!");
  
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

    

    const handleEditarCurso = () => {
        if (props.curso !== null) {
            // Llamar a la función para actualizar el curso en Firebase
            updateFirebaseDoc(`/Cursos/${props.curso.id}`, {
                nombre: nombreCurso,
                descripcion: descripcionCurso,
                modalidad: modalidad,
                fecha_inicio: fechaInicio,
                fecha_finalizacion: fechaFin,
                link_plataforma: linkCurso,
                horario: horario,
                image_url: `/Cursos/${nombreCurso}/`,
                aprobados: [],
                reprobados: [],
                matriculados: [],
                postulados: [],
                estado: 0,
            });
            // Después de enviar los datos, mostrar el mensaje de éxito
            setMensajeExito("Curso editado con éxito!");

            setTimeout(() => {
              setMensajeExito('');
            }, 5000); // El mensaje de éxito se mostrará durante 5 segundos (5000 milisegundos)
        } 
    }

    const handleSubmit = () => {
        switch (true) {
            case props.id.startsWith('course-section-modal-add'):
                handleCrearCurso();
                break;
            case props.id.startsWith('course-section-modal-edit'):
                handleEditarCurso();
                break;
            default:
                console.error('ID de modal no reconocido:', props.id);
        }
    };

    return (
      <>
      <button type="button" className={props.styleButton}  data-bs-toggle="modal" data-bs-target={`#${props.id}`}>
    {props.nombreButton}
    </button>
      <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h1 className="modal-title fs-5 text-dark" id="staticBackdropLabel">{props.titulo}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-start">
                  <form action="">
                    <div className="row">
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={nombreCurso} onChange={handleNombreCursoChange}  placeholder="Nombre del curso" required/>
                      </div>
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="descripcion">Descripción</label>
                        <input type="text" className="form-control" id="descripcion" name="descripcion" value={descripcionCurso} onChange={handleDescripcionCursoChange} placeholder="Descripción del curso" required/>
                      </div>
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="modalidad">Modalidad</label>
                        <select id="modalidad" className="form-select" name="modalidad" value={modalidad} onChange={handleModalidadChange} required>
                          <option disabled value="">Selecciona una modalidad</option>
                          <option value="Presencial">Presencial</option>
                          <option value="Virtual">Virtual</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="fechaInicio">Fecha de Inicio</label>
                        <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" value={fechaInicio ? fechaInicio.toISOString().substring(0, 10) : ''} onChange={handleFechaInicioChange} required/>
                      </div>
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="fechaFin">Fecha de Fin</label>
                        <input type="date" className="form-control" id="fechaFin" name="fechaFin" value={fechaFin ? fechaFin.toISOString().substring(0, 10) : ''} onChange={handleFechaFinChange} required/>
                      </div>
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="horario">Horario</label>
                        <input type="text" className="form-control" id="horario" name="horario" value={horario} onChange={handleHorarioChange}placeholder="Ej: Lunes: 8:00am - 9:00am" required/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="linkClase">Link de Clase</label>
                        <input type="url" className="form-control" id="linkClase" name="linkClase" value={linkCurso} onChange={handleLinkCursoChange}/>
                      </div>
                      <div className="col">
                        <label className="form-label text-dark" htmlFor="imagen">Imagen Ilustrativa</label>
                        <input type="file" className="form-control" id="imagen" name="imagen" onChange={ (event) => setFileImage(event.target.files![0])}/>
                      </div>
                    </div>
                  </form>
              </div>
              <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">{props.submitButton}</button>
              </div>
            </div>
          </div>
        </div>
        
         {mensajeExito && (
          <div className="alert alert-success centered-alert" role="alert">
            {mensajeExito}
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
          </div>
        )}
      </>
)}

