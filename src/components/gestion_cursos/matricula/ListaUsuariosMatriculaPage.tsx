import {useEffect, useState} from 'react';
import { getFirebaseDocs } from '../../../api/getFirebaseDocs/getFirebaseDocs';
import DataTableBase from '../../dataTable/DataTableBase';

//interfaz de un usuario con datos reducido. 
interface Users {
    id: string;
    nombre: string;
    cedula: string;
    telefono: string;
    correo: string;
}

export const ListaUsuariosMatriculaPage = ({ onRegresarClick, idCurso, nombreCurso, usuariosInteresados}: { onRegresarClick: () => void; idCurso: string; nombreCurso:string; usuariosInteresados: string[] }) => {

    const [users, setUsers] = useState<Users[]>([]);

    //Columnas a usar dentro de la tabla
    //Columnas de la tabla
    const columns = [
        {
            name: "Nombre",
            selector: (row: any) => row.nombre,
            sortable: true,
            width: "30vw",
        },

        {
            name: "Cédula",
            selector: (row: any) => row.cedula,
            sortable: true,
        },

        {
            name: "Correo",
            selector: (row: any) => row.correo,
            sortable: true,
        },

        {
            name: "Teléfono",
            selector: (row: any) => row.telefono,
            sortable: true,
        },
    ];

    useEffect(() => {
    
        const fetchData = async() => {
            try{
                const docSnap =  await getFirebaseDocs('Usuarios');
                const usuariosFiltrados = docSnap.filter((doc: any) =>
                    usuariosInteresados.includes(doc.id)
                );
                const userData = usuariosFiltrados.map((doc: any) => ({
                    id: doc.id,
                    nombre: doc.nombre,
                    cedula: doc.cedula,
                    telefono: doc.telefono,
                    correo: doc.correo,
                    //descripcion: doc.descripcion,
                    //usuariosInteresados: doc.usuarios_interesados,
                }));
                //console.log('DATOS DE LOS USUARIOS: ', userData);
                setUsers(userData);
                
            }catch(error){
                console.error('Error Al traer los usuarios:', error);
            }
        }
        
        fetchData();
        
    }, [])




    const handleClickRegresar = () => {
        onRegresarClick(); // aqui estoy llamando a la funcion del componente ListaCursosMAtriculaPage para que cambie el estado de showListaUsuarios a false. Y asi se vuelva a mostrar la lista de los cursos matriculados
    }
  
  //console.log(`ESTE ES EL NOMBRE DEL CURSO ${nombreCurso}`, 'Y este el id de sus usuarios interesados: ', usuariosInteresados);
  
    return (
        <div>
            <h1>ListaUsuariosMatriculaPage</h1>
            <h5 className="text-muted pt-4" >
                        Interesados en el curso: {nombreCurso} 
            </h5>
            <DataTableBase columns={columns} data={users} />
            <button onClick={handleClickRegresar}>
                regresar
            </button>
        </div>
  )
}
