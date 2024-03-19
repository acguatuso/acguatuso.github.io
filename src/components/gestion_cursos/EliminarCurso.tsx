import { deleteFirebaseDoc } from "../../api/deleteFirebaseDoc/deleteFirebaseDoc"
import { Modal } from "../../components/Modal/Modal"


interface idBorrar {
    id: string
}
  

function EliminarCurso(prop: idBorrar) {
    const handleDelete = async() =>{
        await deleteFirebaseDoc(`/Cursos/${prop.id}`)

    }

    return (
    <>
        <Modal
        id={`course-section-modal-delete-${prop.id}`}
        buttonStyle={"btn btn-danger"}
        modalTitle="Eliminar"
        buttonName={'Eliminar'}
        modalName={'Eliminar'}
        body={'¿Estás seguro que desea eliminar este curso?'}
        secondaryButtonText={'Cancelar'}
        primaryButtonText={'Aceptar'}
        classSecondaryButton="btn btn-sencodary"
        classPrimaryButton="btn btn-primary"
        functionButtonOption={() => {handleDelete()}} 
        />
    </>
    )
}

export default EliminarCurso