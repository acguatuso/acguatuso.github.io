import { useState, useEffect } from "react";
import DataTableBase from "../../dataTable/DataTableBase";
import { useNavigate } from "react-router-dom";
import { UsuariosMatriculadosPage } from ".";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchCursos } from "../../../redux/reducers/cursosSlice";
import { useAppDispatch } from "../../../hooks/hooks";
import { Curso } from "../curso.interface";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  getFirebaseDocs,
  getPaginatedDocs,
} from "../../../api/getFirebaseDocs/getFirebaseDocs";

export const ListaCursosAprobacionesPage = () => {
  //REDUX/////////////////////////////////////////////////////
  // El dispatch lo necesito para lo de Redux con los cursos
  const dispatch = useAppDispatch();
  const coursesRedux = useSelector((state: RootState) => state.cursos.cursos);

  //console.log({coursesRedux});
  //REDUX///////////////////////////////////////////////////////

  //const [courses, setCourses] = useState<Course[]>([]);
  const [showUsuariosMatriculados, setShowUsuariosMatriculados] =
    useState(false); // Esto me servira, para cuando le doy clic al boton de gestionar me muestre el otro componente
  const [idCursoConsular, setIdCursoConsultar] = useState("");
  const [nombreCurso, setNombreCurso] = useState("");
  // const [usuariosInteresadosCurso, setUsuariosInteresadosCurso] = useState<string[]>([]);
  const [usuariosMatriculados, setUsuariosMatriculados] = useState<string[]>(
    []
  );
  const [usuariosAprobados, setUsuariosAprobados] = useState<string[]>([]);
  const [usuariosReprobados, setUsuariosReprobados] = useState<string[]>([]);
  //const [filteredCourses, setFilteredCourses] = useState<Course[]> ([]);
  const [filteredCourses, setFilteredCourses] = useState<Curso[]>([]);
  const [cursos, setCursos] = useState<Array<Curso>>([]);
  const [filterText, setFilterText] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [inputState, setInputState] = useState(true);
  const [enterPressed, setEnterPressed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [totalRows, setTotalRows] = useState(0);
  const [pageCursors, setPageCursors] = useState<{
    [page: number]: QueryDocumentSnapshot<DocumentData> | null;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    getCursos(currentPage);
    getTotalRows();
  }, [currentPage, perPage]);

  //Columnas de la tabla
  const columns = [
    {
      name: "Alumnos",
      selector: (row: Curso) => row.matriculados?.length || 0,
      cell: (row: Curso) => (
        <div className="text-start">{row.matriculados?.length || 0}</div>
      ),
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
      cell: (row: any) => <div className="text-start">{row.nombre}</div>,
      sortable: true,
    },
    {
      name: "Horario",
      cell: (row: any) => (
        <div className="text-start">
          {row.horario.map((h: any, index: number) => (
            <div key={index}>
              {h.dia}: {h.hora}
            </div>
          ))}
        </div>
      ),
    },

    {
      name: "Fecha Inicio",
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
        return <div>{modalidadTexto}</div>;
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
              row.matriculados,
              row.aprobados,
              row.reprobados
            )
          }
        >
          <i className="fa-solid fa-users"></i>
        </button>
      ),
    },
  ];

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
    setCursos(cursosOrdenados);
    setFilteredCourses(cursosOrdenados);
    setLoading(false);
  };

  const handleClickListaUsuarios = (
    idCurso: string,
    nombreCurso: string,
    matriculadosCurso: string[],
    aprobadosCurso: string[],
    reprobadosCurso: string[]
  ) => {
    setIdCursoConsultar(idCurso);
    setNombreCurso(nombreCurso);
    setUsuariosMatriculados(matriculadosCurso);
    setUsuariosAprobados(aprobadosCurso);
    setUsuariosReprobados(reprobadosCurso);
    //console.log({usuariosReprobados})

    setShowUsuariosMatriculados(true);
  };
  const getTotalRows = async () => {
    const totalCourses = await getFirebaseDocs("Cursos");
    setTotalRows(totalCourses.length);
  };

  const handleRegresarClick = () => {
    setFilteredCourses(cursos);
    setShowUsuariosMatriculados(false); // Cambia el estado a true cuando se hace clic en Regresar
  };

  useEffect(() => {
    if (enterPressed) {
      const filtered = cursos.filter((course) => {
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
        return false; // Return false for any unhandled types or cases
      });
      setFilteredCourses(filtered);
      setEnterPressed(!enterPressed);
    }
    if (filterText.trim() === "") {
      setFilteredCourses(cursos);
    }
  }, [filterText, coursesRedux, enterPressed]);

  const regresarCursosPage = () => {
    navigate("/ucag-admin/Cursos");
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPageSize: number, page: number) => {
    setPerPage(newPageSize);
    setCurrentPage(page);
  };

  return (
    <div>
      {showUsuariosMatriculados ? (
        <UsuariosMatriculadosPage
          onRegresarClick={handleRegresarClick}
          nombreCurso={nombreCurso} //usuariosInteresados={usuariosInteresadosCurso}
          matriculados={usuariosMatriculados}
          aprobados={usuariosAprobados}
          reprobados={usuariosReprobados}
          idCurso={idCursoConsular}
        />
      ) : (
        <>
          <div>
            <h5 className="text-muted pt-4">Lista de Cursos</h5>
          </div>

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
            paginationPerPage={perPage}
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            progressPending={loading}
          />
        </>
      )}
    </div>
  );
};
