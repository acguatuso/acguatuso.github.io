import { useState, useEffect } from 'react';
import { getFirebaseDocs } from "../../../api/getFirebaseDocs/getFirebaseDocs";
import DataTableBase from "../../dataTable/DataTableBase";
import { useNavigate } from 'react-router-dom';
import { UsuariosMatriculadosPage } from '.';


//interfaz de un curso con datos reducido. 
interface Course {
    id: string;
    nombre: string;
    descripcion: string;
    usuariosInteresados: string[];
    matriculados: string[];
}
export const ListaCursosAprobacionesPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [showUsuariosMatriculados, setShowUsuariosMatriculados] = useState(false); // Esto me servira, para cuando le doy clic al boton de gestionar me muestre el otro componente 
    const [idCursoConsular, setIdCursoConsultar] = useState('');
    // const [nombreCurso, setNombreCurso] = useState('');
    // const [usuariosInteresadosCurso, setUsuariosInteresadosCurso] = useState<string[]>([]);
    // const [usuariosMatriculados, setUsuariosMatriculados] = useState<string[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]> ([]);
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
                    onClick={() => handleClickListaUsuarios(row.id, row.nombre, row.usuariosInteresados, row.matriculados)}
                    >
                    <i className='fa-solid fa-users'></i>
                </button>
            ),
            width: "8vw",
        }
    ];
  
    const handleClickListaUsuarios = (idCurso: string, nombreCurso: string, usuariosInte: string[], matriculadosCurso: string[]) => {
    
        // setUsuariosInteresadosCurso(usuariosInte);
        setIdCursoConsultar(idCurso);
        // setNombreCurso(nombreCurso);
        // setUsuariosMatriculados(matriculadosCurso);
        
         setShowUsuariosMatriculados(true);
    }

    const handleRegresarClick = () => {
         setShowUsuariosMatriculados(false); // Cambia el estado a true cuando se hace clic en Regresar
    }
    useEffect(() => {
    
        const fetchData = async() => {
            try{
                const docSnap =  await getFirebaseDocs('Cursos');
                const coursesData = docSnap.map((doc: any) => ({
                    id: doc.id,
                    nombre: doc.nombre,
                    descripcion: doc.descripcion,
                    usuariosInteresados: doc.postulados,//doc.usuarios_interesados,
                    matriculados: doc.matriculados,
                }));
                //console.log(coursesData);
                setCourses(coursesData);
            }catch(error){
                console.error('Error Al traer los cursos:', error);
            }
        }
        
        fetchData();
        
    }, [])
    useEffect(() => {
        if (filterText.trim() === ''){
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course => 
                course.nombre.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
            );
            //console.log('Estos son los cursos filtrados por nombre: ', filtered);
            setFilteredCourses(filtered);
        }
    }, [filterText, courses]);

    const regresarCursosPage = () => {
        navigate('/Cursos');
    }

    return (
        <div>

            {showUsuariosMatriculados ? (
                <UsuariosMatriculadosPage onRegresarClick={handleRegresarClick} /* idCurso={idCursoConsular} */ 
                //     nombreCurso = {nombreCurso} usuariosInteresados={usuariosInteresadosCurso}
                     /* matriculados = {usuariosMatriculados} *//>
            ) : (
                <>
                    <div>
                        <h5 className="text-muted pt-4" >
                            Lista de Cursos
                        </h5>

                    </div>

                    <div className='d-flex justify-content-between'>
                        <button className="btn btn-primary mt-3 "
                                onClick={regresarCursosPage}>Regresar</button>
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