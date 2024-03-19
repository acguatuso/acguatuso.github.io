import { useState, useEffect} from 'react';
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { FormularioCursos } from "./FormularioCursos";
import { Curso } from './curso.interface';
import EliminarCurso from './EliminarCurso';

function GestionCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);



  useEffect(() => {
    // Obtiene los cursos de Firebase
    const obtenerCursos = async () => {
      const cursosData = await getFirebaseDocs("Cursos");
      var cursosFormateados: Curso[] = [];
      cursosFormateados = cursosData.map((curso: any) => ({
        id: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        modalidad: curso.modalidad,
        fecha_inicio: curso.fecha_inicio, 
        fecha_finalizacion: curso.fecha_finalizacion, 
        horario: curso.horario,
        link_plataforma: curso.link_plataforma
      }));
      setCursos(cursosFormateados);
    };

    obtenerCursos();
  }, []);
  
  return (
    <>
      <h2>Gestión de Cursos</h2>
      <FormularioCursos 
      id={"course-section-modal-add"}
      titulo={"Crear un Nuevo Curso"}
      nombreButton={"Crear un Nuevo Curso"}
      submitButton={"Crear Curso"}
      curso={null}
      />
      <div>
        <h2>Lista de Cursos</h2>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map(curso => (
              <tr key={curso.id}>
                <td>{curso.nombre}</td>
                <td>{curso.descripcion}</td>
                <td>
                <FormularioCursos 
                id={`course-section-modal-edit-${curso.id}`}
                titulo={`Editar Curso: ${curso.nombre}`}
                nombreButton={"Editar"}
                submitButton={"Guardar Cambios"}
                curso={curso}
                />
                </td>
                <td>
                  <EliminarCurso id={curso.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}

export default GestionCursos;

