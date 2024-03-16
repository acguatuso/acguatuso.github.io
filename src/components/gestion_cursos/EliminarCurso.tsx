import { deleteFirebaseDoc } from "../../api/deleteFirebaseDoc/deleteFirebaseDoc"
import { Modal } from "../../components/Modal/Modal"
import { idDelete } from "../../pages/About/components/about.interface"

function EliminarCurso(prop: idDelete) {
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
        buttonOption1={'Cancelar'}
        buttonOption2={'Aceptar'}
        functionButtonOption={() => {handleDelete()}} 
        />
    </>
    )
}

export default EliminarCurso