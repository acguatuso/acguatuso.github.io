import React from "react";
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
      theme="dark"
      striped
      fixedHeader
      fixedHeaderScrollHeight="450px"
      responsive
      {...props}
    />
  );
}

export default DataTableBase;
