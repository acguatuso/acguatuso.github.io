import { useSelector } from "react-redux";
import DataTableBase from "../../dataTable/DataTableBase";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getFirebaseDocs } from "../../../api/getFirebaseDocs/getFirebaseDocs";

interface Course {
    id: string;
    nombre: string;
    descripcion: string;
  }

export const MatriculaPage = () => {
    
    // Acceso de usuario
    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    
    const navigate = useNavigate();

    const [courses, setCourses] = useState<Course[]>([]);
    
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
                >
                <i className='fa-solid fa-users'></i>
            </button>
        ),
        width: "8vw",
    }
];


useEffect(() => {
    
    const fetchData = async() => {
        try{
            const docSnap =  await getFirebaseDocs('Cursos');
            const coursesData = docSnap.map((doc: any) => ({
                id: doc.id,
                nombre: doc.nombre,
                descripcion: doc.descripcion,
            }));
            console.log(coursesData);
            setCourses(coursesData);
        }catch(error){
            console.error('Error Al traer los cursos:', error);
        }
    }
    
    
    
    if(!loggedIn && !user){
        navigate('/');
    }
    fetchData();
    
}, [loggedIn, user, navigate])
  

  return (
    <div>
        <h2 className="text-secondary mb-0 pt-3 ps-2 ">
            Gestión de Matrículas
        </h2>
         <DataTableBase columns={columns} data={courses} />
    </div>
    
  )
}
