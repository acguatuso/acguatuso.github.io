import { useState, useEffect } from 'react';
import { getFirebaseDocs } from "../../../api/getFirebaseDocs/getFirebaseDocs";
import DataTableBase from "../../dataTable/DataTableBase";
import { ListaUsuariosMatriculaPage } from '.';

//interfaz de un curso con datos reducido. 
interface Course {
    id: string;
    nombre: string;
    descripcion: string;
    usuariosInteresados: string[];
}

export const ListaCursosMatriculaPage = () => {

    const [courses, setCourses] = useState<Course[]>([]);
    const [showUsuariosMatricula, setShowUsuariosMatricula] = useState(false);
    const [idCursoConsular, setIdCursoConsultar] = useState('');
    const [usuariosInteresadosCurso, setUsuariosInteresadosCurso] = useState<string[]>([]);

    
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
                    onClick={() => handleClickListaUsuarios(row.id, row.usuariosInteresados)}
                    >
                    <i className='fa-solid fa-users'></i>
                </button>
            ),
            width: "8vw",
        }
    ];

    const handleClickListaUsuarios = (idCurso: string, usuariosInte: string[]) => {
        //console.log('ID del Curso: ', idCurso);
        //console.log('Estos son los usuarios interesados: ', usuariosInte);
        setUsuariosInteresadosCurso(usuariosInte);
        setIdCursoConsultar(idCurso);
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
                    usuariosInteresados: doc.usuarios_interesados,
                }));
                console.log(coursesData);
                setCourses(coursesData);
            }catch(error){
                console.error('Error Al traer los cursos:', error);
            }
        }
        
        fetchData();
        
    }, [])

  return (
    <div>
        {showUsuariosMatricula ? (
                <ListaUsuariosMatriculaPage onRegresarClick={handleRegresarClick} idCurso={idCursoConsular} 
                    usuariosInteresados={usuariosInteresadosCurso}/>
            ) : (
                <DataTableBase columns={columns} data={courses} />
            )}
         
    </div>
  )
}
