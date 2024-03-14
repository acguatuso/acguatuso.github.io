import { FormularioCursos } from "./FormularioCursos";
import { Curso } from './curso.interface';

interface editProps{
    curso: Curso
}

export const EditarCurso = (props: editProps) => {
  return (
    <>
      <FormularioCursos 
      id={`course-section-modal-edit-${props.curso.id}`}
      titulo={"Editar Curso"}
      nombreButton={"Editar"}
      submitButton={"Guardar Cambios"}
      curso={props.curso}
      />
    </>
  )
}

export default EditarCurso