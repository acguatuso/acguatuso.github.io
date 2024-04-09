import { useState, useEffect } from 'react';
import DataTableBase from "../../dataTable/DataTableBase";
import { ListaUsuariosMatriculaPage } from '.';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { fetchCursos } from '../../../redux/reducers/cursosSlice';
import { Curso } from '../curso.interface';

export const ListaCursosMatriculaPage = () => {

    //REDUX/////////////////////////////////////////////////////
    // El dispatch lo necesito para lo de Redux con los cursos
    const dispatch = useAppDispatch();
    const coursesRedux = useSelector((state: RootState) => state.cursos.cursos);

    useEffect(() => {
        (async () => {
            await dispatch(fetchCursos())
        })()
    }, [dispatch])

    // console.log({coursesRedux});
    //REDUX///////////////////////////////////////////////////////

    //const [courses, setCourses] = useState<Course[]>([]);
    const [showUsuariosMatricula, setShowUsuariosMatricula] = useState(false);
    const [idCursoConsular, setIdCursoConsultar] = useState('');
    const [nombreCurso, setNombreCurso] = useState('');
    const [usuariosInteresadosCurso, setUsuariosInteresadosCurso] = useState<string[]>([]);
    const [usuariosMatriculados, setUsuariosMatriculados] = useState<string[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Curso[]> ([]);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();
    
    //Columnas de la tabla
    const columns = [
        {
            name: "Nombre",
            selector: (row: any) => row.nombre,
            sortable: true,
            width: "30vw",
        },

        {
            name: "Descripción",
            selector: (row: any) => row.descripcion,
            sortable: true,
            width: "50vw",
        },
    
    
        {
            name: "Gestionar",
            cell: (row: any) => (
                
                <button
                    className="btn btn-primary"
                    onClick={() => handleClickListaUsuarios(row.id, row.nombre, row.postulados, row.matriculados)}
                    >
                    <i className='fa-solid fa-users'></i>
                </button>
            ),
            width: "8vw",
        }
    ];

    const handleClickListaUsuarios = (idCurso: string, nombreCurso: string, usuariosInte: string[], matriculadosCurso: string[]) => {   
        setUsuariosInteresadosCurso(usuariosInte);
        setIdCursoConsultar(idCurso);
        setNombreCurso(nombreCurso);
        setUsuariosMatriculados(matriculadosCurso);
        setShowUsuariosMatricula(true);
    }

    const handleRegresarClick = () => {
        setShowUsuariosMatricula(false); // Cambia el estado a true cuando se hace clic en Regresar
    }

    useEffect(() => {
        if (filterText.trim() === ''){
            setFilteredCourses(coursesRedux);
        } else {
            const filtered = coursesRedux.filter(course => 
                course.nombre.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
            );
            setFilteredCourses(filtered);
        }
    }, [filterText, coursesRedux]);



    const regresarCursosPage = () => {
        navigate('/Cursos');
    }
  return (
    <div>

        {showUsuariosMatricula ? (
                <ListaUsuariosMatriculaPage onRegresarClick={handleRegresarClick} idCurso={idCursoConsular} 
                    nombreCurso = {nombreCurso} usuariosInteresados={usuariosInteresadosCurso}
                    matriculados = {usuariosMatriculados}/>
            ) : (
                <>
                    <h5 className="text-muted pt-4" >
                        Lista de Cursos
                    </h5>
                    <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary mt-3 "
                                onClick={regresarCursosPage}><FaArrowLeft /> Volver</button>
                        <div className="col-md-2">

                            <input 
                                type="text"
                                className='form-control bg-light text-dark mt-3 me-2 border border-primary shadow-lg' 
                                placeholder='Filtrar por nombre'
                                value = {filterText}
                                onChange={e => setFilterText(e.target.value)}/>
                        </div>
                    </div>
                        <DataTableBase columns={columns} data={filteredCourses} />
                </>
            )}
         
    </div>
  )
}
