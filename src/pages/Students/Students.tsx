import { useEffect, useState } from "react";
import Table from "./Table";
import DataTableBase from "../../components/dataTable/DataTableBase";

const columns = [
  {
    name: "Número",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "Nombre",
    selector: (row: any) => row.name,
    sortable: true,
  },

  {
    name: "Cédula",
    selector: (row: any) => row.idCR,
    sortable: true,
  },
  {
    name: "Télefono",
    selector: (row: any) => row.phone,
    sortable: true,
  },
  {
    name: "Correo",
    selector: (row: any) => row.email,
    sortable: true,
    width: "250px",
  },
  {
    name: "Ver",
    cell: (row: { name: any }) => (
      <button onClick={() => handleButtonClick(row.name)}>Ver</button>
    ),
    ignoreRowClick: true,
  },
  {
    name: "Editar",
    cell: (row: { name: any }) => (
      <button onClick={() => handleButtonClick(row.name)}>Editar</button>
    ),
    ignoreRowClick: true,
  },
  {
    name: "Eliminar",
    cell: (row: { name: any }) => (
      <button onClick={() => handleButtonClick(row.name)}>Eliminar</button>
    ),
    ignoreRowClick: true,
  },
];

const Students = () => {
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("/src/pages/Students/data.json")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    const filtered = jsonData.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [filterText, jsonData]);

  const addStudent = () => {
    const newEntry = {
      id: jsonData.length + 1, // Generate a new ID for the entry
      name: "New Student",
      idCR: "1234567",
      phone: "12345678",
      email: "new.student@example.com",
    };
    setJsonData([newEntry, ...jsonData]); // Add the new entry to jsonData
  };

  return (
    <div
      className="position-fixed"
      style={{ top: "18%", left: "10%", right: "10%", bottom: "10%" }}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h2 className="text-secondary mb-0 pt-3 ps-2">Estudiantes</h2>
          <button
            className="btn btn-dark py-0 ms-2 mt-3"
            style={{ height: "35px" }}
            onClick={() => addStudent()}
          >
            Crear Estudiante
          </button>
        </div>
        <input
          type="text"
          placeholder="Filtrar por Nombre"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <DataTableBase columns={columns} data={filteredData} />
    </div>
  );
};

function handleButtonClick(id: any): void {
  console.log("Button clicked for:", id);
}

export default Students;
