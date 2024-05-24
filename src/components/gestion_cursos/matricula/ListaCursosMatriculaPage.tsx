import { useState, useEffect } from "react";
import DataTableBase from "../../dataTable/DataTableBase";
import { ListaUsuariosMatriculaPage } from ".";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { Curso } from "../curso.interface";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { getFirebaseDocs, getPaginatedDocs } from "../../../api/getFirebaseDocs/getFirebaseDocs";


export const ListaCursosMatriculaPage = () => {
  //REDUX/////////////////////////////////////////////////////
  // El dispatch lo necesito para lo de Redux con los cursos


  // console.log({coursesRedux});
  //REDUX///////////////////////////////////////////////////////

  //const [courses, setCourses] = useState<Course[]>([]);
  const [showUsuariosMatricula, setShowUsuariosMatricula] = useState(false);
  const [idCursoConsular, setIdCursoConsultar] = useState("");
  const [nombreCurso, setNombreCurso] = useState("");
  const [usuariosInteresadosCurso, setUsuariosInteresadosCurso] = useState<[]>(
    []
  );
  const [usuariosMatriculados, setUsuariosMatriculados] = useState<string[]>(
    []
  );
  const [courses, setCourses] = useState<Array<Curso>>([]);
  const [filteredCourses, setFilteredCourses] = useState<Curso[]>([]);
  const [filterText, setFilterText] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [inputState, setInputState] = useState(true);
  const [enterPressed, setEnterPressed] = useState(false);
  // @ts-ignore
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [totalRows, setTotalRows] = useState(0);
  const [pageCursors, setPageCursors] = useState<{
    [page: number]: QueryDocumentSnapshot<DocumentData> | null;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Columnas de la tabla
  const columns = [
    {
      name: "Postulados",
      selector: (row: any) => row.postulados!.length,
      cell: (row: any) => (
        <div className="text-start">{row.postulados!.length}</div>
      ),
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
      cell: (row: any) => <div className="text-start">{row.nombre}</div>,
      sortable: true,
    },

    // {
    //     name: "Descripción",
    //     selector: (row: any) => row.descripcion,
    //     sortable: true,
    //     width: "20vw",
    // },

    {
      name: "Horario",
      selector: (row: any) => row.horario,
      cell: (row: any) => (
        <div className="text-start">
          {row.horario.map((h: any, index: number) => (
            <div key={index}>
              {h.dia}: {h.hora}
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },

    {
      name: "Fecha Inicio",
      // selector: (row:any) => {
      //     if (row.fecha_inicio && typeof row.fecha_inicio.toDate === 'function') {
      //         return row.fecha_inicio.toDate().toLocaleDateString();
      //     } else {
      //         return "Cargando...";
      //     }
      // },

      selector: (row: any) => {
        row.fecha_inicio;
      },
      cell: (row: any) => {
        if (row.fecha_inicio && typeof row.fecha_inicio.toDate === "function") {
          const fecha = row.fecha_inicio.toDate();
          const dia = fecha.getDate();
          const mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
          const año = fecha.getFullYear();
          return <div>{`${dia}/${mes}/${año}`}</div>;
        } else {
          return <div>Cargando...</div>;
        }
      },
      sortable: true,
    },

    {
      name: "Fecha Fin",
      // selector: (row:any) => {
      //     if (row.fecha_finalizacion && typeof row.fecha_finalizacion.toDate === 'function') {
      //         return row.fecha_finalizacion.toDate().toLocaleDateString();
      //     } else {
      //         return "Cargando...";
      //     }
      // },
      selector: (row: any) => {
        row.fecha_finalizacion;
      },
      cell: (row: any) => {
        if (
          row.fecha_finalizacion &&
          typeof row.fecha_finalizacion.toDate === "function"
        ) {
          const fecha = row.fecha_finalizacion.toDate();
          const dia = fecha.getDate();
          const mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
          const año = fecha.getFullYear();
          return <div>{`${dia}/${mes}/${año}`}</div>;
        } else {
          return <div>Cargando...</div>;
        }
      },
      sortable: true,
    },

    {
      name: "Modalidad",
      selector: (row: any) => row.modalidad,
      cell: (row: any) => {
        let modalidadTexto = "";
        switch (row.modalidad) {
          case 0:
            modalidadTexto = "Presencial";
            break;
          case 1:
            modalidadTexto = "Virtual";
            break;
          case 2:
            modalidadTexto = "Mixta";
            break;
          default:
            modalidadTexto = "Desconocida";
        }
        return <div>{`${modalidadTexto}`}</div>;
      },
      sortable: true,
    },

    {
      name: "Gestionar",
      cell: (row: any) => (
        <button
          className="btn btn-primary"
          onClick={() =>
            handleClickListaUsuarios(
              row.id,
              row.nombre,
              row.postulados,
              row.matriculados
            )
          }
        >
          <i className="fa-solid fa-users"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    getCursos(currentPage);
    getTotalRows();
  }, [currentPage, perPage]);

  const getCursos = async (targetPage: number) => {
    setLoading(true);
    let lastDoc = pageCursors[targetPage];
    const { dataList, newLastVisible } = await getPaginatedDocs(
      "Cursos",
      perPage,
      lastDoc
    );

    if (dataList.length > 0) {
      setLastVisible(newLastVisible);
      setPageCursors((prev) => ({ ...prev, [targetPage + 1]: newLastVisible }));
    } else {
      setLastVisible(null);
    }
    const data = dataList as Curso[];

    const numSolicitantes: { [idCurso: string]: number } = {};
    data.forEach((curso) => {
      if (curso.id) {
        numSolicitantes[curso.id] = curso.postulados.length;
      }
    });
    const cursosConFechaCreacion = data.filter(
      (curso) => curso.fechaCreacion !== undefined
    );
    const cursosOrdenados = cursosConFechaCreacion.sort((a, b) => {
      return b.fechaCreacion!.toMillis() - a.fechaCreacion!.toMillis();
    });
    setCourses(cursosOrdenados);
    setFilteredCourses(cursosOrdenados);
    setLoading(false);
  };

  const handleClickListaUsuarios = (
    idCurso: string,
    nombreCurso: string,
    usuariosInte: [],
    matriculadosCurso: string[]
  ) => {
    // console.log({matriculadosCurso});

    setUsuariosInteresadosCurso(usuariosInte);
    setIdCursoConsultar(idCurso);
    setNombreCurso(nombreCurso);
    setUsuariosMatriculados(matriculadosCurso);
    setShowUsuariosMatricula(true);
  };

  const handleRegresarClick = () => {
    setFilteredCourses(courses);
    setShowUsuariosMatricula(false); // Cambia el estado a true cuando se hace clic en Regresar
  };

  useEffect(() => {
    if (enterPressed) {
      const filtered = courses.filter((course) => {
        const selectedValue = course[selectedSearch];
        if (typeof selectedValue === "string") {
          return selectedValue.toLowerCase().includes(filterText.toLowerCase());
        } else if (typeof selectedValue == "number") {
          let modalidadText = "";
          switch (selectedValue) {
            case 0:
              modalidadText = "presencial";
              break;
            case 1:
              modalidadText = "virtual";
              break;
            case 2:
              modalidadText = "mixta";
              break;
            default:
              return false; // This handles unexpected numbers
          }
          return modalidadText.includes(filterText.toLowerCase());
        }
      });
      setFilteredCourses(filtered);
      setEnterPressed(!enterPressed);
    }
    if (filterText.trim() === "") {
      setFilteredCourses(courses);
    }
  }, [filterText, courses, enterPressed, perPage]);

  const regresarCursosPage = () => {
    navigate("/Cursos");
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
    const totalCourses = await getFirebaseDocs("Cursos");
    setTotalRows(totalCourses.length);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPageSize: number, page: number) => {
    setPerPage(newPageSize);
    setCurrentPage(page);
  };

  return (
    <div>
      {showUsuariosMatricula ? (
        <ListaUsuariosMatriculaPage
          onRegresarClick={handleRegresarClick}
          idCurso={idCursoConsular}
          nombreCurso={nombreCurso}
          usuariosInteresados={usuariosInteresadosCurso}
          matriculados={usuariosMatriculados}
        />
      ) : (
        <>
          <h5 className="text-muted pt-4">Lista de Cursos</h5>
          <div className="d-flex justify-content-between mb-2">
            <button
              className="btn btn-outline-primary mt-3 "
              onClick={regresarCursosPage}
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
                  <option value="modalidad">Modalidad</option>
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
            data={filteredCourses}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            progressPending={loading}
          />

        </>
      )}
    </div>
  );
};
