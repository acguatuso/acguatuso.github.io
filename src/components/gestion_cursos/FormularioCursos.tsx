import { useState, ChangeEvent, useEffect} from 'react';
import { addFirebaseDoc } from "../../api/addFirebaseDoc/addFirebaseDoc";
import { updateFirebaseDoc } from '../../api/updateFirebaseDoc/updateFirebaseDoc';
import { Curso, Horario } from './curso.interface';
import './CursosMain.css'
import { uploadFirebaseImage } from '../../api/uploadFirebaseImage/uploadFirebaseImage';
import { Toast } from '../Toast/Toast';
import { MdDelete } from 'react-icons/md';

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
    const [horarios, setHorarios] = useState<Horario[]>([{ dia: '', hora: '' }]); // Lista de Horarios
    const [selectedDia, setSelectedDia] = useState('');
    const [newHorario, setNewHorario] = useState('');
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
            setHorarios(props.curso.horario || [{ dia: '', hora: '' }]);
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
  
    const handleHorariosChange = (index: number, key: keyof Horario, value: string) => {
        const newHorarios = [...horarios];
        newHorarios[index][key] = value;
        if (key === 'dia') {
            setSelectedDia(value);
        } else if (key === 'hora') {
            setNewHorario(value);
        }
        setHorarios(newHorarios);
        console.log(horarios)
    };

    const handleAddHorario = (): void => {
        if (selectedDia && newHorario) {
            setNewHorario(''); 
            setSelectedDia(''); 
            setHorarios([...horarios, { dia: '', hora: '' }]);
            console.log(horarios);
        }
    };

    const handleRemoveHorario = (index: number) => {
        const newHorarios = [...horarios];
        newHorarios.splice(index, 1);
        setHorarios(newHorarios);
    };

    const handleReset = () => {
        setNombreCurso('');
        setDescripcionCurso('');
        setModalidad('');
        setFechaInicio(null);
        setFechaFin(null);
        setLinkCurso('');
        setHorarios([{ dia: '', hora: '' }]);
    };

    const handleCrearCurso = async() => {
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
          horario: horarios,
          fechaCreacion: fechaCreacion,
          image_url: `/Cursos/${nombreCurso}/`,
          aprobados: [],
          reprobados: [],
          matriculados: [],
          postulados: [],
          estado: 0,
  
      };
      console.log(cursoData)
      const res = await addFirebaseDoc('Cursos', cursoData);
      console.log(res)
  
      // Después de enviar los datos, mostrar el mensaje de éxito
      setMensajeExito("Curso agregado con éxito!");
  
      // Limpiar el formulario y cerrar el modal después de unos segundos
      setTimeout(() => {
        setMensajeExito('');
      }, 5000); // El mensaje de éxito se mostrará durante 5 segundos (5000 milisegundos)
    };
 

    const handleEditarCurso = () => {
        if(fileImage != null){
            uploadFirebaseImage(fileImage, `/Cursos/${nombreCurso}/image1`)
            setFileImage(undefined);
        }
        if (props.curso !== null) {
            // Llamar a la función para actualizar el curso en Firebase
            updateFirebaseDoc(`/Cursos/${props.curso.id}`, {
                nombre: nombreCurso,
                descripcion: descripcionCurso,
                modalidad: modalidad,
                fecha_inicio: fechaInicio,
                fecha_finalizacion: fechaFin,
                link_plataforma: linkCurso,
                horario: horarios,
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
        <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{props.titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReset}></button>
                    </div>
                    <div className="modal-body text-start">
                        <form id='form-modal-cursos'>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="informacionHeading">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#informacionCollapse" aria-expanded="true" aria-controls="informacionCollapse">
                                        Información
                                        </button>
                                    </h2>
                                    <div id="informacionCollapse" className="accordion-collapse collapse" aria-labelledby="informacionHeading">
                                        <div className="accordion-body">
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
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="horariosHeading">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#horariosCollapse" aria-expanded="false" aria-controls="horariosCollapse">
                                        Horarios
                                        </button>
                                    </h2>
                                    <div id="horariosCollapse" className="accordion-collapse collapse" aria-labelledby="horariosHeading">
                                        <div className="accordion-body">
                                        {horarios.map((horario, index) => (
                                            <div key={index} className="input-group mb-3">
                                                <select className="form-select input-group-text text-start" value={horario.dia} onChange={(e) => handleHorariosChange(index, 'dia', e.target.value)} required>
                                                    <option disabled value="">Selecciona un día</option>
                                                    <option value="Lunes">Lunes</option>
                                                    <option value="Martes">Martes</option>
                                                    <option value="Miércoles">Miércoles</option>
                                                    <option value="Jueves">Jueves</option>
                                                    <option value="Viernes">Viernes</option>
                                                    <option value="Sábado">Sábado</option>
                                                    <option value="Domingo">Domingo</option>
                                                </select>
                                                <input type="text" className="form-control" value={horario.hora} onChange={(e) => handleHorariosChange(index, 'hora', e.target.value)} aria-label="horario" aria-describedby="inputGroup-sizing-default8" required/>
                                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveHorario(index)}> <MdDelete/> </button>
                                            </div>
                                        ))}  
                                        <div className='text-end'>
                                          <button type="button" className="btn btn-primary" onClick={handleAddHorario}>
                                             Agregar Horario
                                          </button>
                                        </div>
                                    
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleReset}>Cancelar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>{props.submitButton}</button>
                    </div>
                </div>
            </div>
        </div>
        {/* <Toast 
        id='toast-form-cursos' 
        message={mensajeExito} 
        title='Seccion de avisos'
        /> */}
        <div>
          {mensajeExito && (
            <div className="alert alert-success centered-alert" role="alert">
              {mensajeExito}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
        </div>
      </>
)}

