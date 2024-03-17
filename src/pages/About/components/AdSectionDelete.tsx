import { deleteFirebaseDoc } from "../../../api/deleteFirebaseDoc/deleteFirebaseDoc"
import { Modal } from "../../../components/Modal/Modal"
import { idDelete } from './about.interface';




export const AdSectionDelete = (prop: idDelete) => {
    const handleDelete = async() =>{
        await deleteFirebaseDoc(`/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones/${prop.id}`)

    }

    return (
    <>
        <Modal
        id={'ad-section-modal-delete'}
        buttonStyle={"btn-close"}
        modalTitle="Eliminar"
        buttonName={''}
        modalName={'Eliminar'}
        body={'¿Estás seguro que desea eliminar está sección?'}
        buttonOption1={'Cancelar'}
        buttonOption2={'Aceptar'}
        functionButtonOption={() => {handleDelete()}} 
        />
    </>
  )
}
