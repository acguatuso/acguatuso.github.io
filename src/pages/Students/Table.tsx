import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableBase from "../../components/dataTable/DataTableBase";

const columns = [
  {
    name: "ID",
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
    name: "Acciones",
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    idCR: "1234567",
    phone: "61234567",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    idCR: "2345671",
    phone: "81234567",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    idCR: "3456712",
    phone: "61234568",
    email: "alice.johnson@example.com",
  },
];

// export const Filtering = () => {
// 	const [filterText, setFilterText] = React.useState('');
// 	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
// 	const filteredItems = jsonData.filter(
// 		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
// 	);

// 	const subHeaderComponentMemo = React.useMemo(() => {
// 		const handleClear = () => {
// 			if (filterText) {
// 				setResetPaginationToggle(!resetPaginationToggle);
// 				setFilterText('');
// 			}
// 		};

// 		return (
// 			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
// 		);
// 	}, [filterText, resetPaginationToggle]);

const Table = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("src/pages/Students/data.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);
  return (
    <DataTableBase
      title="Estudiantes"
      columns={columns}
      data={jsonData}
    />
  );
};

export default Table;