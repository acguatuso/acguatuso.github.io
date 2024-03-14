import { useState, useEffect} from 'react';
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import CrearCurso from "./CrearCurso"
import EditarCurso from './EditarCurso';
import { Curso } from './curso.interface';


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
      <CrearCurso/>
      <div>
  <h2>Lista de Cursos</h2>
  <table className="table">
    <thead className="table-dark">
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Duración</th>
        <th scope="col">Editar</th>
        <th scope="col">Eliminar</th>
      </tr>
    </thead>
    <tbody>
      {cursos.map(course => (
        <tr key={course.id}>
          <td>{course.nombre}</td>
          <td>{course.descripcion}</td>
          <td>
            <EditarCurso curso={course}/>
          </td>
          <td>
            <button className="btn btn-danger" /* onClick={() => handleDelete(course.id)} */>Eliminar</button>
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

