import { useState, useEffect } from 'react';
import { getFirebaseDocs } from "../../../api/getFirebaseDocs/getFirebaseDocs";
import DataTableBase from "../../dataTable/DataTableBase";
import { ListaUsuariosMatriculaPage } from '.';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

//interfaz de un curso con datos reducido. 
interface Course {
    id: string;
    nombre: string;
    descripcion: string;
    usuariosInteresados: string[];
    matriculados: string[];
}

export const ListaCursosMatriculaPage = () => {

    const [courses, setCourses] = useState<Course[]>([]);
    const [showUsuariosMatricula, setShowUsuariosMatricula] = useState(false);
    const [idCursoConsular, setIdCursoConsultar] = useState('');
    const [nombreCurso, setNombreCurso] = useState('');
    const [usuariosInteresadosCurso, setUsuariosInteresadosCurso] = useState<string[]>([]);
    const [usuariosMatriculados, setUsuariosMatriculados] = useState<string[]>([]);
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
        //console.log('ID del Curso: ', idCurso);
        //console.log('Estos son los usuarios interesados: ', usuariosInte);
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
