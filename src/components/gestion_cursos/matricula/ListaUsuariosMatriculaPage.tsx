import { useEffect, useState } from 'react';
import { getFirebaseDocs } from '../../../api/getFirebaseDocs/getFirebaseDocs';
import DataTableBase from '../../dataTable/DataTableBase';
import { AceptarRechazarUsuario } from './AceptarRechazarUsuario';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaCheck, FaTimes } from 'react-icons/fa';


//interfaz de un usuario con datos reducido. 
interface Users {
    id: string;
    nombre: string;
    cedula: string;
    telefono: string;
    correo: string;
}

export const ListaUsuariosMatriculaPage = ({ onRegresarClick, idCurso, nombreCurso, usuariosInteresados, matriculados }:
    { onRegresarClick: () => void; idCurso: string; nombreCurso: string; usuariosInteresados: any[]; matriculados: string[] }) => {

    const [users, setUsers] = useState<Users[]>([]);
    const [showDetailsUserModal, setShowDetailsUserModal] = useState(false); // estado para controlar la visibilidad del modal
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
    const [filterText, setFilterText] = useState('');
    const [updatedMatriculados, setUpdatedMatriculados] = useState<string[]>(matriculados);


    //Columnas a usar dentro de la tabla
    //Columnas de la tabla
    const columns = [
        {
            name: "Nombre",
            selector: (row: any) => row.nombre,
            sortable: true,
            width: "30vw",
        },

        // {
        //     name: "Cédula",
        //     selector: (row: any) => row.cedula,
        //     sortable: true,
        // },

        {
            name: "Correo",
            selector: (row: any) => row.correo,
            sortable: true,
            //width: "30vw",
        },




        {
            name: "Estado",
            // cell: (row: Users) => (
            //     <span style={{ color: updatedMatriculados.includes(row.id) ? 'green' : 'red' }}>
            //         {updatedMatriculados.includes(row.id) ? "Matriculado" : "No matriculado"}
            //     </span>
            // ),
            cell: (row: Users) => (
                <span style={{ color: updatedMatriculados.includes(row.id) ? 'green' : 'red' }}>
                    {updatedMatriculados.includes(row.id) ? <FaCheck color="green" /> : <FaTimes color="red" />}
                </span>
            ),
            sortable: true,
            sortFunction: (a: Users, b: Users) => {
                const aMatriculado = updatedMatriculados.includes(a.id);
                const bMatriculado = updatedMatriculados.includes(b.id);
        
                if (aMatriculado && !bMatriculado) {
                    return -1; // Muestra los matriculados primero
                } else if (!aMatriculado && bMatriculado) {
                    return 1; // Muestra los no matriculados después
                } else {
                    return 0; // Mantén el orden original si ambos estados son iguales
                }
            },
            width: "10vw",
        },

        {
            name: "Detalles",
            cell: (row: any) => (
                <button
                    className="btn btn-primary"
                    onClick={() => handleClickVer(row)}
                >
                    <i className='fa-regular fa-eye'></i>
                </button>
            ),
            width: "8vw",
        }
    ];

    useEffect(() => {

        // console.log({usuariosInteresados})
        // console.log({matriculados});

         const fetchData = async () => {
            try {
                const docSnap = await getFirebaseDocs('Usuarios');
                // const usuariosFiltrados = docSnap.filter((doc: any) =>
                //     usuariosInteresados.includes(doc.id)
                // );

                const usuariosFiltrados = docSnap.filter((doc) =>
                    usuariosInteresados.some((usuario) => usuario.id === doc.id)
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
                console.log('DATOS DE LOS USUARIOS: ', userData);
                setUsers(userData);
                //console.log('Lista de aceptados en curso> ', matriculados);

            } catch (error) {
                console.error('Error Al traer los usuarios:', error);
            }
        }

        fetchData(); 

    }, [])

    useEffect(() => {
        if (filterText.trim() === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user =>
                user.nombre.toLowerCase().includes(filterText.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [filterText, users]);

    const closeSeeUserModal = () => {
        setShowDetailsUserModal(false);
    }

    const openSeeUserModal = () => {
        setShowDetailsUserModal(true);
    }

    const handleClickVer = (usuario: Users): void => {
        console.log("Boton click:", usuario);
        openSeeUserModal();
        setSelectedUser(usuario);
    }

    const handleUpdateMatriculados = (newMatriculados: string[]) => {
        setUpdatedMatriculados(newMatriculados);
    }

    const handleClickRegresar = () => {
        onRegresarClick(); // aqui estoy llamando a la funcion del componente ListaCursosMAtriculaPage para que cambie el estado de showUsuariosMatriculados a false. Y asi se vuelva a mostrar la lista de los cursos matriculados
    }

    //console.log(`ESTE ES EL NOMBRE DEL CURSO ${nombreCurso}`, 'Y este el id de sus usuarios interesados: ', usuariosInteresados);

    return (
        <>

            <div>

                <h5 className="text-muted pt-4" >
                    Interesados en el curso: {nombreCurso}
                </h5>
                <div className="d-flex justify-content-between">
                    <button 
                        className="btn btn-outline-primary mt-3 "
                        onClick={handleClickRegresar}>
                        <FaArrowLeft /> Volver
                    </button>
                    <div className="col-md-2">

                        <input
                            type="text"
                            className='form-control bg-light text-dark mt-3 me-2 border border-primary shadow-lg'
                            placeholder='Filtrar por nombre'
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)} />
                    </div>
                </div>
                <DataTableBase columns={columns} data={filteredUsers} />
            </div>
            <AceptarRechazarUsuario
                mostrar={showDetailsUserModal}
                onClose={closeSeeUserModal}
                usuario={selectedUser}
                usuariosMatriculados={matriculados}
                idCurso={idCurso} 
                nombreCurso={nombreCurso}
                onUpdateMatriculados={handleUpdateMatriculados} // Pasar la función de actualización
                />
        </>
        /* idCurso = {idCurso} */

    )
}
