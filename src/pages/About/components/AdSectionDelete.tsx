import { deleteFirebaseDoc } from "../../../api/deleteFirebaseDoc/deleteFirebaseDoc"
import { Modal } from "../../../components/Modal/Modal"
import { idDelete } from './about.interface';




export const AdSectionDelete = (prop: idDelete) => {
    //debe de eliminar la imagen 
    const handleDelete = async() =>{
        console.log(prop.id,'handleDelete')
        await deleteFirebaseDoc(`/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones/${prop.id}`)
        prop.globalStateFunction2()
    }

    return (
    <>
        <Modal

        id={'ad-section-modal-delete'}
        buttonStyle={"btn btn-danger btn-sm"}
        modalTitle="Eliminar"
        buttonName={'Eliminar'}
        modalName={'Eliminar'}
        body={'¿Estás seguro que desea eliminar está sección?'}
        secondaryButtonText={'Cancelar'}
        primaryButtonText={'Aceptar'}
        classPrimaryButton="btn btn-danger"
        classSecondaryButton="btn btn-secondary"
        functionButtonOption={()=> handleDelete()}
        />
    </>
  )
}
