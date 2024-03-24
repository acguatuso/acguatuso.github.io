import './styles.css';
import DataTable, { TableProps, createTheme } from "react-data-table-component";

createTheme("dark", {
  striped: {
    default: "#393939",
  },
});


function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
      noDataComponent="No hay información para mostrar."
      striped
      fixedHeader
      fixedHeaderScrollHeight="80vh"
      responsive
      {...props}
    />
  );
}

export default DataTableBase;
