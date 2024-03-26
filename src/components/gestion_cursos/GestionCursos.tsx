import { useState, useEffect} from 'react';
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { FormularioCursos } from "./FormularioCursos";
import { Curso } from './curso.interface';
import EliminarCurso from './EliminarCurso';
import DataTableBase from '../dataTable/DataTableBase';
import { FaAddressCard, FaEdit } from 'react-icons/fa';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    name: "Nombre",
    selector: (row: any) => row.nombre,
    sortable: true,
  },
  {
    name: "Horario",
    cell: (row: any) => (
      <div className='text-start'>
        {row.horario.map((h: any, index: number) => (
        <div key={index}>
            {h.dia}: {h.hora}
        </div>
        ))}
      </div>
    ),
    sortable: true,
  },
  {
    name: "Modalidad",
    selector: (row: any) => row.modalidad,
    sortable: true,
  },
  {
    name: "Ver",
    cell: (row: any) => (
      <button
        className="btn btn-primary"
        onClick={() => handleButtonClick(row.nombre)}
      >
        <FaAddressCard />
      </button>
    ),
    width: "5vw",
  },
  {
    name: "Editar",
    cell: (row: any) => (
      <FormularioCursos 
      id={`course-section-modal-edit-${row.id}`}
      titulo={`Editar Curso: ${row.nombre}`}
      nombreButton={<FaEdit />}
      styleButton={"btn btn-warning"}
      submitButton={"Guardar Cambios"}
      curso={row}
      />
    ),
    width: "5vw",
  },
  {
    name: "Eliminar",
    cell: (row: any) => (
      <EliminarCurso id={row.id}/>
    ),
    width: "6vw",
  },
];


function GestionCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    obtenerCursos();
  }, []);

  // LOGICA PARA REDIRECCIONAR SI NO SE ESTA LOGUEADO, PARA QUE NO SE PUEDA ACCEDER MENDIATE URL DIRECTA
  // React-router-dom
  const navigate = useNavigate();
  // Redux Hooks & Access
  const user = useSelector((state: RootState) => state.auth.user);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  console.log('Conectado: ', loggedIn);
  // Redireccionar si está no logueado, y no hay usuario
  useEffect(() => {
    if (!loggedIn && !user) {
      navigate("/");
    }
  }, [loggedIn, user, navigate]);

  // Obtiene los cursos de Firebase
    const obtenerCursos = async () => {
      const cursosData = await getFirebaseDocs("Cursos");
      var cursosFormateados: Curso[] = [];
      cursosFormateados = cursosData.map((curso: any) => ({
        id: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        modalidad: curso.modalidad,
        fechaCreacion: curso.fechaCreacion,
        fecha_inicio: curso.fecha_inicio, 
        fecha_finalizacion: curso.fecha_finalizacion, 
        horario: curso.horario,
        link_plataforma: curso.link_plataforma
      }));
      cursosFormateados.sort((a, b) => b.fechaCreacion.toMillis() - a.fechaCreacion.toMillis());
      setCursos(cursosFormateados);
      console.log(cursosFormateados)
      
    };
  
  return (
    <>
      <div style={{ top: "18%", left: "10%", right: "10%", bottom: "10%" }}>
      <h2 className="text-secondary mb-0 pt-3 ps-2">
        Gestión de Cursos
      </h2>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <FormularioCursos
          id={"course-section-modal-add"}
          titulo={"Crear un Nuevo Curso"}
          nombreButton={"Crear un Nuevo Curso"}
          styleButton='btn btn-success py-0 ms-2 mt-3 shadow-lg'
          submitButton={"Crear Curso"}
          curso={null}
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control bg-light text-dark mt-3 me-2 border border-primary shadow-lg"
            placeholder="Filtrar por Nombre"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>
      <div>
          <DataTableBase columns={columns} data={cursos}></DataTableBase>
      </div>

    </>
  );
}

export default GestionCursos;

function handleButtonClick(name: any): void {
  console.log(name)
}

