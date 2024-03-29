import {useEffect} from 'react';
import { getFirebaseDocs } from '../../../api/getFirebaseDocs/getFirebaseDocs';

export const ListaUsuariosMatriculaPage = ({ onRegresarClick, idCurso, usuariosInteresados}: { onRegresarClick: () => void; idCurso: string; usuariosInteresados: string[] }) => {

    useEffect(() => {
    
        const fetchData = async() => {
            try{
                const docSnap =  await getFirebaseDocs('Usuarios');
                const usuariosFiltrados = docSnap.filter((doc: any) =>
                    usuariosInteresados.includes(doc.id)
                );
                const coursesData = usuariosFiltrados.map((doc: any) => ({
                    id: doc.id,
                    nombre: doc.nombre,
                    //descripcion: doc.descripcion,
                    //usuariosInteresados: doc.usuarios_interesados,
                }));
                console.log('ESTOS SON LOS DATOS DE LOS USUARIOS DEL CURSO DE JAPAN: ', coursesData);
                
            }catch(error){
                console.error('Error Al traer los usuarios:', error);
            }
        }
        
        fetchData();
        
    }, [])




    const handleClickRegresar = () => {
        onRegresarClick(); // aqui estoy llamando a la funcion del componente ListaCursosMAtriculaPage para que cambie el estado de showListaUsuarios a false. Y asi se vuelva a mostrar la lista de los cursos matriculados
    }
  
  console.log('ESTE ES EL ID DEL CURSO: ', idCurso, 'Y este el id de sus usuarios interesados: ', usuariosInteresados);
  
    return (
        <div>
            <h1>ListaUsuariosMatriculaPage</h1>
            <button onClick={handleClickRegresar}>
                regresar
            </button>
        </div>
  )
}
