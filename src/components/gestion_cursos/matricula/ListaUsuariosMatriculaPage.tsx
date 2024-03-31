import { useEffect, useState } from 'react';
import { getFirebaseDocs } from '../../../api/getFirebaseDocs/getFirebaseDocs';
import DataTableBase from '../../dataTable/DataTableBase';
import { AceptarRechazarUsuario } from './AceptarRechazarUsuario';

//interfaz de un usuario con datos reducido. 
interface Users {
    id: string;
    nombre: string;
    cedula: string;
    telefono: string;
    correo: string;
}

export const ListaUsuariosMatriculaPage = ({ onRegresarClick, idCurso, nombreCurso, usuariosInteresados, matriculados }:
    { onRegresarClick: () => void; idCurso: string; nombreCurso: string; usuariosInteresados: string[]; matriculados: string[] }) => {

    const [users, setUsers] = useState<Users[]>([]);
    const [showDetailsUserModal, setShowDetailsUserModal] = useState(false); // estado para controlar la visibilidad del modal
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
    const [filterText, setFilterText] = useState('');


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
            width: "50vw",
        },

        // {
        //     name: "Teléfono",
        //     selector: (row: any) => row.telefono,
        //     sortable: true,
        // },

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

        const fetchData = async () => {
            try {
                const docSnap = await getFirebaseDocs('Usuarios');
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
                console.log('Lista de aceptados en curso> ', matriculados);

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


    const handleClickRegresar = () => {
        onRegresarClick(); // aqui estoy llamando a la funcion del componente ListaCursosMAtriculaPage para que cambie el estado de showListaUsuarios a false. Y asi se vuelva a mostrar la lista de los cursos matriculados
    }

    //console.log(`ESTE ES EL NOMBRE DEL CURSO ${nombreCurso}`, 'Y este el id de sus usuarios interesados: ', usuariosInteresados);

    return (
        <>

            <div>

                <h5 className="text-muted pt-4" >
                    Interesados en el curso: {nombreCurso}
                </h5>
                <div className="d-flex justify-content-end mb-2">
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
                <button
                    className="btn btn-primary"
                    onClick={handleClickRegresar}>
                    regresar
                </button>
            </div>
            <AceptarRechazarUsuario
                mostrar={showDetailsUserModal}
                onClose={closeSeeUserModal}
                usuario={selectedUser}
                usuariosMatriculados={matriculados}
                idCurso={idCurso} />
        </>
        /* idCurso = {idCurso} */

    )
}
