import { deleteFirebaseDoc } from "../../../api/deleteFirebaseDoc/deleteFirebaseDoc"
import { deleteFirebaseImages } from "../../../api/deleteFirebaseImage/deleteFirebaseImage";
import { useAppDispatch } from "../../../hooks/hooks";
import { deleteSection } from "../../../redux/reducers/aboutSlice";
import { idDelete } from './about.interface';




export const AdsSectionDelete = (prop: idDelete ) => {
    const dispatch = useAppDispatch()
    const handleDelete = async() =>{
        console.log(prop!.id,'handleDelete')
        await deleteFirebaseDoc(`/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones/${prop!.id}`)
        if(prop.image_url == ''){
            await deleteFirebaseImages(prop.image_url)
        }
        dispatch(deleteSection(prop))
    }
    
    return (
    <>
    <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target={`#ad-section-modal-delete${prop.id}`}>
    Eliminar
    </button>

    <div className="modal fade" id={`ad-section-modal-delete${prop.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Eliminar</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            ¿Estás seguro que desea eliminar está sección?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss='modal' onClick={()=> handleDelete()}>Aceptar</button>
            </div>
            </div>
        </div>
    </div> 

        {/* <Modal

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
        /> */}
    </>
  )
}
