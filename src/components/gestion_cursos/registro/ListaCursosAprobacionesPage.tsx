import { useState, useEffect } from 'react';
import DataTableBase from "../../dataTable/DataTableBase";
import { useNavigate } from 'react-router-dom';
import { UsuariosMatriculadosPage } from '.';
import { FaArrowLeft } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { fetchCursos } from '../../../redux/reducers/cursosSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { Curso } from '../curso.interface';

export const ListaCursosAprobacionesPage = () => {
    //REDUX/////////////////////////////////////////////////////
    // El dispatch lo necesito para lo de Redux con los cursos
    const dispatch = useAppDispatch();
    const coursesRedux = useSelector((state: RootState) => state.cursos.cursos);

    useEffect(() => {
        (async () => {
            await dispatch(fetchCursos())
        })()
    }, [dispatch])

    //console.log({coursesRedux});
    //REDUX///////////////////////////////////////////////////////

    //const [courses, setCourses] = useState<Course[]>([]);
    const [showUsuariosMatriculados, setShowUsuariosMatriculados] = useState(false); // Esto me servira, para cuando le doy clic al boton de gestionar me muestre el otro componente 
    const [idCursoConsular, setIdCursoConsultar] = useState('');
    const [nombreCurso, setNombreCurso] = useState('');
    // const [usuariosInteresadosCurso, setUsuariosInteresadosCurso] = useState<string[]>([]);
    const [usuariosMatriculados, setUsuariosMatriculados] = useState<string[]>([]);
    const [usuariosAprobados, setUsuariosAprobados] = useState<string[]>([]);
    const [usuariosReprobados, setUsuariosReprobados] = useState<string[]>([]);
    //const [filteredCourses, setFilteredCourses] = useState<Course[]> ([]);
    const [filteredCourses, setFilteredCourses] = useState<Curso[]>([]);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    //Columnas de la tabla
    const columns = [
        {
            name: "Nombre",
            selector: (row: any) => row.nombre,
            sortable: true,
            width: "20vw",
        },

        // {
        //     name: "Descripción",
        //     selector: (row: any) => row.descripcion,
        //     sortable: true,
        //     width: "50vw",
        // },

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
            name: "Fecha Inicio",
            selector: (row:any) => {
                if (row.fecha_inicio && typeof row.fecha_inicio.toDate === 'function') {
                    return row.fecha_inicio.toDate().toLocaleDateString();
                } else {
                    return "Cargando...";
                }
            },
            sortable: true,
            width: "15vw",
        },

        {
            name: "Fecha Fin",
            selector: (row:any) => {
                if (row.fecha_finalizacion && typeof row.fecha_finalizacion.toDate === 'function') {
                    return row.fecha_finalizacion.toDate().toLocaleDateString();
                } else {
                    return "Cargando...";
                }
            },
            sortable: true,
            width: "15vw",
        },

        {
            name: "Modalidad",
            selector: (row: any) => row.modalidad,
            sortable: true,
            width: "15vw",
        },


        {
            name: "Gestionar",
            cell: (row: any) => (

                <button
                    className="btn btn-primary"
                    onClick={() => handleClickListaUsuarios(row.id, row.nombre, row.matriculados, row.aprobados, row.reprobados)}
                >
                    <i className='fa-solid fa-users'></i>
                </button>
            ),
            width: "8vw",
        }
    ];

    const handleClickListaUsuarios = (idCurso: string, nombreCurso: string, matriculadosCurso: string[], aprobadosCurso: string[], reprobadosCurso: string[]) => {

        setIdCursoConsultar(idCurso);
        setNombreCurso(nombreCurso);
        setUsuariosMatriculados(matriculadosCurso);
        setUsuariosAprobados(aprobadosCurso);
        setUsuariosReprobados(reprobadosCurso);
        //console.log({usuariosReprobados})

        setShowUsuariosMatriculados(true);
    }

    const handleRegresarClick = () => {
        setShowUsuariosMatriculados(false); // Cambia el estado a true cuando se hace clic en Regresar
    }

    useEffect(() => {
        if (filterText.trim() === '') {
            setFilteredCourses(coursesRedux);
        } else {
            const filtered = coursesRedux.filter(course =>
                course.nombre.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
            );
            //console.log('Estos son los cursos filtrados por nombre: ', filtered);
            setFilteredCourses(filtered);
        }
    }, [filterText, coursesRedux]);

    const regresarCursosPage = () => {
        navigate('/Cursos');
    }

    return (
        <div>

            {showUsuariosMatriculados ? (
                <UsuariosMatriculadosPage onRegresarClick={handleRegresarClick}
                    nombreCurso={nombreCurso} //usuariosInteresados={usuariosInteresadosCurso}
                    matriculados={usuariosMatriculados}
                    aprobados={usuariosAprobados}
                    reprobados={usuariosReprobados}
                    idCurso={idCursoConsular} />
            ) : (
                <>
                    <div>
                        <h5 className="text-muted pt-4" >
                            Lista de Cursos
                        </h5>

                    </div>

                    <div className='d-flex justify-content-between'>
                        <button className="btn btn-outline-primary mt-3 "
                            onClick={regresarCursosPage}><FaArrowLeft /> Volver</button>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className='form-control bg-light text-dark mt-3 border border-primary shadow-lg'
                                placeholder='Filtrar por nombre'
                                value={filterText}
                                onChange={e => setFilterText(e.target.value)}
                            />
                        </div>
                    </div>
                    <DataTableBase columns={columns} data={filteredCourses} />
                </>
            )}

        </div>
    )
}