import { useEffect, useState } from "react";

import {
  getFirebaseDocs,
  getPaginatedDocs,
} from "../../../api/getFirebaseDocs/getFirebaseDocs";

import DataTableBase from "../../dataTable/DataTableBase";
import { AceptarRechazarUsuario } from "./AceptarRechazarUsuario";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCheck, FaTimes } from "react-icons/fa";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";


//interfaz de un usuario con datos reducido.
interface Users {
  id: string;
  nombre: string;
  cedula: string;
  telefono: string;
  correo: string;
  hora_solicitud: Date; // Agregar la propiedad hora_solicitud de tipo Date
  [key: string]: string | number | Date;
}

export const ListaUsuariosMatriculaPage = ({
  onRegresarClick,
  idCurso,
  nombreCurso,
  usuariosInteresados,
  matriculados,
}: {
  onRegresarClick: () => void;
  idCurso: string;
  nombreCurso: string;
  usuariosInteresados: any[];
  matriculados: string[];
}) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [showDetailsUserModal, setShowDetailsUserModal] = useState(false); // estado para controlar la visibilidad del modal
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [filterText, setFilterText] = useState("");
  const [updatedMatriculados, setUpdatedMatriculados] =
    useState<string[]>(matriculados);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [inputState, setInputState] = useState(true);
  const [enterPressed, setEnterPressed] = useState(false);

  // @ts-ignore
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [pageCursors, setPageCursors] = useState<{
    [page: number]: QueryDocumentSnapshot<DocumentData> | null;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);


  //Columnas a usar dentro de la tabla
  //Columnas de la tabla
  const columns = [
    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
      sortable: true,
      width: "15vw",
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
      name: "Hora de Solicitud",
      selector: (row: Users) => row.hora_solicitud.toLocaleString(), // Mostrar la hora_solicitud formateada como string
      sortable: true,
    },

    {
      name: "Estado",
      // cell: (row: Users) => (
      //     <span style={{ color: updatedMatriculados.includes(row.id) ? 'green' : 'red' }}>
      //         {updatedMatriculados.includes(row.id) ? "Matriculado" : "No matriculado"}
      //     </span>
      // ),
      cell: (row: Users) => (
        <span
          style={{
            color: updatedMatriculados.includes(row.id) ? "green" : "red",
          }}
        >
          {updatedMatriculados.includes(row.id) ? (
            <FaCheck color="green" />
          ) : (
            <FaTimes color="red" />
          )}
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
        <button className="btn btn-primary" onClick={() => handleClickVer(row)}>
          <i className="fa-regular fa-eye"></i>
        </button>
      ),
      width: "8vw",
    },
  ];

  useEffect(() => {
    // console.log({ usuariosInteresados })
    // console.log({matriculados});

    fetchData(currentPage);
    getTotalRows();
    
  }, [currentPage, perPage]);


  useEffect(() => {
    if (enterPressed) {
      const filtered = users.filter((user) => {
        const selectedValue = user[selectedSearch];
        if (typeof selectedValue === "string") {
          return selectedValue.toLowerCase().includes(filterText.toLowerCase());
        }
      });
      setFilteredUsers(filtered);
      setEnterPressed(!enterPressed);

    }
    if (filterText.trim() === "") {
      setFilteredUsers(users);
    }
  }, [filterText, users, enterPressed]);

  const fetchData = async (targetPage: number) => {
    setLoading(true);
    let lastDoc = pageCursors[targetPage];
    const { dataList, newLastVisible } = await getPaginatedDocs(
      "Usuarios",
      perPage,
      lastDoc
    );

    if (dataList.length > 0) {
      setLastVisible(newLastVisible);
      setPageCursors((prev) => ({ ...prev, [targetPage + 1]: newLastVisible }));
    } else {
      setLastVisible(null);
    }
    const usuariosFiltrados = dataList.filter((doc) =>
      usuariosInteresados.some((usuario) => usuario.id === doc.id)
    );
   
    console.log('Interesados', usuariosInteresados.length);
    console.log('filtrados',usuariosFiltrados.length);

    const userData = usuariosFiltrados.map((doc: any) => ({
      id: doc.id,
      nombre: doc.nombre,
      cedula: doc.cedula,
      telefono: doc.telefono,
      correo: doc.correo,
      //descripcion: doc.descripcion,
      //usuariosInteresados: doc.usuarios_interesados,
      hora_solicitud:
        usuariosInteresados
          .find((usuario) => usuario.id === doc.id)
          ?.hora_solicitud.toDate() || new Date(),
    }));
    // console.log('DATOS DE LOS USUARIOS: ', userData);

    // Formatear la fecha en userData utilizando toLocaleDateString con las opciones adecuadas
    const formattedUserData = userData.map((user) => ({
      ...user,
      hora_solicitud: user.hora_solicitud.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }));
    setUsers(formattedUserData);
    setLoading(false);
    //setUsers(userData);
    //console.log('Lista de aceptados en curso> ', matriculados);
  };


  const closeSeeUserModal = () => {
    setShowDetailsUserModal(false);
  };

  const openSeeUserModal = () => {
    setShowDetailsUserModal(true);
  };

  const handleClickVer = (usuario: Users): void => {
    // console.log("Boton click:", usuario);
    openSeeUserModal();
    setSelectedUser(usuario);
  };

  const handleUpdateMatriculados = (newMatriculados: string[]) => {
    setUpdatedMatriculados(newMatriculados);
  };

  const handleClickRegresar = () => {
    onRegresarClick(); // aqui estoy llamando a la funcion del componente ListaCursosMAtriculaPage para que cambie el estado de showUsuariosMatriculados a false. Y asi se vuelva a mostrar la lista de los cursos matriculados
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSearch(event.target.value);
    if (inputState) {
      setInputState(!inputState);
    }
  };

  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key === "Enter") {
      setEnterPressed(!enterPressed);
    }
  }


  const getTotalRows = async () => {
    const totalUsers = await getFirebaseDocs("Usuarios");
    const usuariosFiltrados = totalUsers.filter((doc) =>
      usuariosInteresados.some((usuario) => usuario.id === doc.id)
    );
    setTotalRows(usuariosFiltrados.length);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPageSize: number, page: number) => {
    setPerPage(newPageSize);
    setCurrentPage(page);
  };


  //console.log(`ESTE ES EL NOMBRE DEL CURSO ${nombreCurso}`, 'Y este el id de sus usuarios interesados: ', usuariosInteresados);
  // console.log({ filteredUsers })
  return (
    <>
      <div>
        <h5 className="text-muted pt-4">
          Interesados en el curso: {nombreCurso}
        </h5>
        <div className="d-flex justify-content-between mb-2">
          <button
            className="btn btn-outline-primary mt-3 "
            onClick={handleClickRegresar}
          >
            <FaArrowLeft /> Volver
          </button>
          <div className="d-flex">
            <div className="mt-3 mx-2">
              <select
                className="form-select border border-secondary shadow"
                aria-label="Default select example"
                onChange={handleSelectChange}
              >
                <option hidden>Seleccione un filtro</option>
                <option value="nombre">Nombre</option>
                <option value="correo">Correo</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                className="form-control bg-light text-dark mt-3 me-2 border border-primary shadow-lg"
                placeholder="Buscar"
                value={filterText}
                disabled={inputState}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
        <DataTableBase
          columns={columns}
          data={filteredUsers}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          progressPending={loading}
        />

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
  );
};
