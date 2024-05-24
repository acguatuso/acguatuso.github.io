import "./styles.css";
import DataTable, { TableProps } from "react-data-table-component";

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      pagination

      paginationServer

      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
      noDataComponent="No hay información para mostrar."
      progressComponent={<>Cargando...</>}
      striped
      fixedHeader
      //fixedHeaderScrollHeight="80vh"
      responsive
      {...props}
    />
  );
}

export default DataTableBase;
