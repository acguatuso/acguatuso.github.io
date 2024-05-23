import { useState, useEffect, ChangeEvent } from "react";
import { FormularioCursos } from "./FormularioCursos";
import { Curso } from "./curso.interface";
import EliminarCurso from "./EliminarCurso";
import DataTableBase from "../dataTable/DataTableBase";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCursoEstado,
  changeCursoVisible,
  cursosSelector,
  fetchCursos,
  obtenerNombreModalidad,
} from "../../redux/reducers/cursosSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateFirebaseDoc } from "../../api/updateFirebaseDoc/updateFirebaseDoc";
import DetallesCurso from "./DetallesCurso";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  getFirebaseDocs,
  getPaginatedDocs,
} from "../../api/getFirebaseDocs/getFirebaseDocs";

enum Visible {
  NoVisible = 0,
  Matricula = 1,
  Proximamente = 2,
}

function GestionCursos() {
  const [cursos, setCursos] = useState<Array<Curso>>([]);
  const [filteredData, setFilteredData] = useState<Array<Curso>>([]);
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const [error, setError] = useState<string | undefined>(undefined);
  const [filterText, setFilterText] = useState("");
  const dispatch = useAppDispatch();
  const [selectedSearch, setSelectedSearch] = useState("");
  const [inputState, setInputState] = useState(true);
  const [enterPressed, setEnterPressed] = useState(false);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [totalRows, setTotalRows] = useState(0);
  const [pageCursors, setPageCursors] = useState<{
    [page: number]: QueryDocumentSnapshot<DocumentData> | null;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  //const [currentPage, setCurrentPage] = useState(1);
  // const [perPage, setPerPage] = useState(5);

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
    setFilteredData(cursosOrdenados);
    setLoading(false);
  };

  const getTotalRows = async () => {
    const totalCourses = await getFirebaseDocs("Cursos");
    setTotalRows(totalCourses.length);
  };

  useEffect(() => {
    getCursos(currentPage);
    getTotalRows();
  }, [currentPage, perPage]);

  useEffect(() => {
    if (enterPressed) {
      const filtered = filteredData.filter((course) => {
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
      setFilteredData(filtered);
      setEnterPressed(!enterPressed);
    }
    if (filterText.trim() === "") {
      setFilteredData(cursos);
    }
  }, [filterText, enterPressed, selectedSearch]);

  const columns = [
    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
      cell: (row: any) => <div>{row.nombre}</div>,
      sortable: true,
    },
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
      name: "Modalidad",
      selector: (row: any) => obtenerNombreModalidad(row.modalidad),
      cell: (row: any) => <div>{obtenerNombreModalidad(row.modalidad)}</div>,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row: any) => (row.estado === 1 ? "Activo" : "Inactivo"),
      cell: (row: any) => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={row.estado}
            onChange={() => handleSwitchToggleEstado(row)}
          ></input>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Visibilidad",
      selector: (row: any) => row.visible,
      cell: (row: any) => (
        <select
          id="visible"
          className={"form-select"}
          name="visible"
          value={row.visible}
          onChange={(e) => handleVisibleChange(e, row)}
          disabled={row.estado === 0}
          required
        >
          <option disabled value="">
            Selecciona donde será visible el curso
          </option>
          <option value={Visible.Matricula}>Sección de Matrícula</option>
          <option value={Visible.Proximamente}>Sección de Próximamente</option>
          <option value={Visible.NoVisible}>No visible</option>
        </select>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row: any) => (
        <div className="d-flex">
          <DetallesCurso curso={row} />
          <FormularioCursos
            id={`course-section-modal-edit-${row.id}`}
            titulo={`Editar Curso: ${row.nombre}`}
            nombreButton={<FaEdit />}
            styleButton={"btn btn-warning mx-2"}
            submitButton={"Guardar Cambios"}
            curso={row}
          />
          <EliminarCurso id={row.id} image_url={row.image_url} />
        </div>
      ),
    },
  ];

  // LOGICA PARA REDIRECCIONAR SI NO SE ESTA LOGUEADO, PARA QUE NO SE PUEDA ACCEDER MENDIATE URL DIRECTA
  // React-router-dom
  const navigate = useNavigate();
  // Redux Hooks & Access
  const user = useSelector((state: RootState) => state.auth.user);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  // console.log("Conectado: ", loggedIn);
  // Redireccionar si está no logueado, y no hay usuario
  useEffect(() => {
    if (!loggedIn && !user) {
      navigate("/");
    }
  }, [loggedIn, user, navigate]);

  const goBack = () => {
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

  function handleSwitchToggleEstado(row: any): void {
    // Activar o desactivar el estado
    const nuevoEstado = row.estado === 0 ? 1 : 0;

    updateFirebaseDoc(`/Cursos/${row.id}`, {
      estado: nuevoEstado,
    });
    dispatch(changeCursoEstado(row.id));
    const nuevoVisible = nuevoEstado === 0 ? Visible.NoVisible : row.estado;
    updateFirebaseDoc(`/Cursos/${row.id}`, {
      visible: parseInt(nuevoVisible),
    });
    dispatch(changeCursoVisible({ cursoId: row.id, visible: nuevoVisible }));
  }

  function handleVisibleChange(
    e: ChangeEvent<HTMLSelectElement>,
    row: any
  ): void {
    updateFirebaseDoc(`/Cursos/${row.id}`, {
      visible: parseInt(e.target.value),
    });
    dispatch(
      changeCursoVisible({ cursoId: row.id, visible: parseInt(e.target.value) })
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPageSize: number, page: number) => {
    setPerPage(newPageSize);
    setCurrentPage(page);
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-primary me-2" onClick={goBack}>
          <FaArrowLeft /> Volver
        </button>
      </div>
      <div style={{ top: "18%", left: "10%", right: "10%", bottom: "10%" }}>
        <h2 className="text-secondary mb-0 pt-3 ps-2">Gestión de Cursos</h2>
      </div>
      <div className="alert alert-info mt-3" role="alert">
        <strong>Nota:</strong> El{" "}
        <strong>
          <em>Estado</em>
        </strong>{" "}
        si se encuentra activado, se podrá seleccionar la{" "}
        <strong>Visibilidad</strong> del curso entre:{" "}
        <em>Sección de Matrícula, Sección de Próximamente y No Visible.</em> Si
        el{" "}
        <strong>
          <em>Estado</em>
        </strong>{" "}
        se encuentra inactivo la <strong>Visibilidad </strong> del curso se
        encontrará <em>No Visible.</em>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <FormularioCursos
            id={"course-section-modal-add"}
            titulo={"Crear un Nuevo Curso"}
            nombreButton={"Crear un Nuevo Curso"}
            styleButton="btn btn-success py-0 ms-2 mt-3 shadow-lg"
            submitButton={"Crear Curso"}
            curso={null}
          />
        </div>
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
      <div>
        <DataTableBase
          columns={columns}
          data={filteredData}
          paginationPerPage={perPage}
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          progressPending={loading}
        ></DataTableBase>
      </div>
    </>
  );
}

export default GestionCursos;
