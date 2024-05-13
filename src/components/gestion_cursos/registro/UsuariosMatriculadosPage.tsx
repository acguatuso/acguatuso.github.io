import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import DataTableBase from "../../dataTable/DataTableBase";
import { getFirebaseDocs } from "../../../api/getFirebaseDocs/getFirebaseDocs";
import { AprobarReprobarUsuario } from ".";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importa los íconos necesarios

//interfaz de un usuario con datos reducido.
interface Users {
  id: string;
  nombre: string;
  cedula: string;
  telefono: string;
  correo: string;
  [key: string]: string;
}

export const UsuariosMatriculadosPage = ({
  onRegresarClick,
  nombreCurso,
  matriculados,
  idCurso,
  aprobados,
  reprobados,
}: {
  onRegresarClick: () => void;
  nombreCurso: string;
  matriculados: string[];
  idCurso: string;
  aprobados: string[];
  reprobados: string[];
}) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [showDetailsUserModal, setShowDetailsUserModal] = useState(false); // estado para controlar la visibilidad del modal
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [filterText, setFilterText] = useState("");
  const [updateAprobados, setUpdateAprobados] = useState<string[]>(aprobados);
  const [updateReprobados, setUpdateReprobados] =
    useState<string[]>(reprobados);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [inputState, setInputState] = useState(true);
  const [enterPressed, setEnterPressed] = useState(false);

  //Columnas a usar dentro de la tabla
  const columns = [
    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
      sortable: true,
      width: "13vw",
    },

    {
      name: "Cédula",
      selector: (row: any) => row.cedula,
      sortable: true,
      width: "10vw",
    },

    {
      name: "Correo",
      selector: (row: any) => row.correo,
      sortable: true,
      width: "20vw",
    },

    {
      name: "Estado",
      /*cell: (row: Users) => (
                <span style={{ color: updateAprobados.includes(row.id) ? 'green' : 'red'}}>
                    {updateAprobados.includes(row.id)? 'Aprobado' : 'Reprobado'}
                </span>
            ),*/
      cell: (row: Users) => {
        const estaAprobado = updateAprobados.includes(row.id);
        const estaReprobado = updateReprobados.includes(row.id);

        // @ts-ignore
        const noCalificado = !estaAprobado && !estaReprobado; // no se encuentra ni en aprobados ni en reprobados

        let icono;
        let color = "gray";
        // @ts-ignore
        let estado = "No calificado";

        if (estaAprobado) {
          color = "green";
          //estado = 'Aprobado';
          icono = <FaCheck color="green" />;
        } else if (estaReprobado) {
          icono = <FaTimes color="red" />;
          color = "red";
          estado = "Reprobado";
        } else {
          icono = "?";
        }

        return (
          <span style={{ color }}>
            {icono}
            {/* {estado} */}
          </span>
        );
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
    const fetchData = async () => {
      try {
        const docSnap = await getFirebaseDocs("Usuarios");
        const usuariosFiltrados = docSnap.filter((doc: any) =>
          matriculados.includes(doc.id)
        );
        const userData = usuariosFiltrados.map((doc: any) => ({
          id: doc.id,
          nombre: doc.nombre,
          cedula: doc.cedula,
          telefono: doc.telefono,
          correo: doc.correo,
        }));
        //console.log('DATOS DE LOS USUARIOS: ', userData);
        setUsers(userData);
        //console.log('Lista de aceptados en curso> ', matriculados);
      } catch (error) {
        console.error("Error Al traer los usuarios matriculados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (enterPressed) {
      const filtered = users.filter((item) => {
        const selectedValue = item[selectedSearch];
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

  const closeSeeUserModal = () => {
    setShowDetailsUserModal(false);
  };

  const openSeeUserModal = () => {
    setShowDetailsUserModal(true);
  };

  const handleClickVer = (usuario: Users): void => {
    openSeeUserModal();
    setSelectedUser(usuario);
  };

  const handleUpdateAprobados = (newAprobados: string[]) => {
    setUpdateAprobados(newAprobados);
  };

  const handleUpdateReprobados = (newReprobados: string[]) => {
    setUpdateReprobados(newReprobados);
  };

  const handleClickRegresar = () => {
    onRegresarClick(); // aqui estoy llamando a la funcion del componente ListaCursosAprobacionesPage para que cambie el estado de showListaUsuarios a false. Y asi se vuelva a mostrar la lista de los cursos matriculados
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

  return (
    <>
      <div>
        <h5 className="text-muted pt-4">
          Usuarios matriculados en el curso de: {nombreCurso}
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
                <option value="cedula">Cédula</option>
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
        <DataTableBase columns={columns} data={filteredUsers}></DataTableBase>
      </div>
      <AprobarReprobarUsuario
        mostrar={showDetailsUserModal}
        onClose={closeSeeUserModal}
        usuario={selectedUser}
        idCurso={idCurso}
        nombreCurso={nombreCurso}
        usuariosAprobados={aprobados}
        usuariosReprobados={reprobados}
        onUpdateAprobados={handleUpdateAprobados}
        onUpdateReprobados={handleUpdateReprobados}
      />
    </>
  );
};
