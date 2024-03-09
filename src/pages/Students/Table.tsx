interface StudentRow {
  id: number;
  name: String;
  dir: String;
  idCR: String; //cedula
  email: String;
}

interface tableProps {
  data: StudentRow[];
}

const Table: React.FC<tableProps>  = ({ data }) => {
  return (
    <>
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
    </>
  );
};

export default Table;
