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
  },
  {
    name: "Editar",
  },
  {
    name: "Eliminar",
  },
];

const Students = () => {
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data
  const [filterText, setFilterText] = useState(""); // State to hold filter text

  useEffect(() => {
    fetch("/src/pages/Students/data.json")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        setFilteredData(data); // Initialize filtered data with all data
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    // Filter data based on filterText
    const filtered = jsonData.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [filterText, jsonData]);

  return (
    <div
      className="position-fixed"
      style={{ top: "18%", left: "10%", right: "10%", bottom: "10%" }}
    >
      <div className="d-flex justify-content-between">
        <h2 className="mb-0 pt-3">Estudiantes</h2>
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

export default Students;
