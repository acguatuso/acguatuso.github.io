import { FormularioCursos } from "./FormularioCursos";

function CrearCurso() {
  
  return (
    <>
      <FormularioCursos 
      id={"course-section-modal-add"}
      titulo={"Crear un Nuevo Curso"}
      nombreButton={"Crear un Nuevo Curso"}
      submitButton={"Crear Curso"}
      curso={null}
      />
    </>
  )
}

export default CrearCurso