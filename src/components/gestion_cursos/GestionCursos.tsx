import { useState, useEffect} from 'react';
import { FormularioCursos } from "./FormularioCursos";
import { Curso } from './curso.interface';
import EliminarCurso from './EliminarCurso';
import DataTableBase from '../dataTable/DataTableBase';
import { FaAddressCard, FaArrowLeft, FaEdit } from 'react-icons/fa';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeCursoDisponibilidad, changeCursoEstado, cursosSelector, fetchCursos } from '../../redux/reducers/cursosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { updateFirebaseDoc } from '../../api/updateFirebaseDoc/updateFirebaseDoc';

function GestionCursos() {
  const [cursos, setCursos] = useState<Array<Curso>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [filterText, setFilterText] = useState("");
  const selectedCursos = useAppSelector(cursosSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchCursos())
    })()
  }, [dispatch])

  useEffect(() => { 
    setLoading(selectedCursos.loading);
    setError(selectedCursos.error);
    if (!selectedCursos.loading && !selectedCursos.error) {
      setCursos(selectedCursos.cursos);
    }
  }, [selectedCursos]) 

  function handleSwitchToggleEstado(row: any): void {
    // Desactivar la disponibilidad cuando se activa el estado
    if (row.disponibilidad === 1) {
      updateFirebaseDoc(`/Cursos/${row.id}`, {
        disponibilidad: 0,
      });
      dispatch(changeCursoDisponibilidad(row.id));
    }
    
    // Activar o desactivar el estado
    updateFirebaseDoc(`/Cursos/${row.id}`, {
      estado: row.estado === 0 ? 1 : 0,
    });
    dispatch(changeCursoEstado(row.id));
  }
  
  function handleSwitchToggleDisponibilidad(row: any): void {
    // Desactivar el estado cuando se activa la disponibilidad
    if (row.estado === 1) {
      updateFirebaseDoc(`/Cursos/${row.id}`, {
        estado: 0,
      });
      dispatch(changeCursoEstado(row.id));
    }
    
    // Activar o desactivar la disponibilidad
    updateFirebaseDoc(`/Cursos/${row.id}`, {
      disponibilidad: row.disponibilidad === 0 ? 1 : 0,
    });
    dispatch(changeCursoDisponibilidad(row.id));
  }
  

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
      name: "Estado",
      cell: (row: any) => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={row.estado}
            onChange={() => handleSwitchToggleEstado(row)}
          ></input>
        </div>
      ),
      width: "5vw",
    },
    {
      name: "Disponibilidad",
      cell: (row: any) => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={row.disponibilidad}
            onChange={() => handleSwitchToggleDisponibilidad(row)}
          ></input>
        </div>
      ),
      width: "5vw",
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
        <EliminarCurso 
          id={row.id}
          image_url={row.image_url}
        />
      ),
      width: "6vw",
    },
  ];

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

  const goBack = () => {
    navigate("/Cursos")
  };


  return (
    <>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-primary me-2" onClick={goBack}>
          <FaArrowLeft /> Volver
        </button>
      </div>
      <div style={{ top: "18%", left: "10%", right: "10%", bottom: "10%" }}>
        <h2 className="text-secondary mb-0 pt-3 ps-2">
          Gestión de Cursos
        </h2>
      </div>
      <div className="alert alert-info mt-3" role="alert">
        <strong>Nota:</strong> La <strong><em>disponibilidad</em></strong> indica si el curso está disponible o no para la visualización y matrícula por parte del usuario. Los  <strong>cursos disponibles</strong> aparecerán en la sección de matrícula. Por otro lado, el <strong><em>estado</em></strong> indica si el curso está disponible de forma inmediata o si estará disponible próximamente. Marcar un curso como  <strong>activo</strong>  lo mostrará en la sección de cursos disponibles próximante.
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
