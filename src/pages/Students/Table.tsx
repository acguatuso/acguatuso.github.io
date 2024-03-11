import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

const tableCustomStyles = {
    headRow: {
      style: {
        color:'#223336',
        backgroundColor: '#e00ef0'
      },
    },
    rows: {
      style: {
        color: "STRIPEDCOLOR",
        backgroundColor: "STRIPEDCOLOR"
      },
      stripedStyle: {
        color: "NORMALCOLOR",
        backgroundColor: "NORMALCOLOR"
      }
    }
  }
// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
	'custom',
	{
		text: {
			primary: '#268bd2',
			secondary: '#2aa198',
		},
		background: {
			default: '#002b36',
            
		},
        striped: {
            default: '#1e1e'
          },
		context: {
			background: '#cb4b16',
			text: '#FFFFFF',
		},
		divider: {
			default: '#073642',
		},
		button: {
			default: '#2aa198',
			hover: 'rgba(0,0,0,.08)',
			focus: 'rgba(255,255,255,.12)',
			disabled: 'rgba(255, 255, 255, .34)',
		},
		sortFocus: {
			default: '#2aa198',
		},
        headRow: {
            style: {
              color:'#223336',
              backgroundColor: '#e00ef0'
            },
          },
	},
	'dark',
);

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

const Table = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("src/pages/Students/data.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);
  return (
    <div>
      <DataTable
        columns={columns}
        data={jsonData}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
        theme="custom"
        striped
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsSingle
        responsive
        style={tableCustomStyles}
      ></DataTable>
    </div>
  );
};

export default Table;

/*
 <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Cédula</th>
            <th>Correo</th>
            <th>Ver</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dir}</td>
              <td>{item.idCR}</td>
              <td>{item.email}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>
*/
