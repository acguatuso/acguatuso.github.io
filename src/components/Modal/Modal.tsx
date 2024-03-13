import { modalProps } from "./modal.interface"

export const Modal = (props: modalProps) => {
  return (
    <>       
    <button type="button" className={props.buttonStyle} data-bs-toggle="modal" data-bs-target={`#${props.id}`}>
    {props.buttonName}
    </button>

    <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">{props.modalTitle}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            {props.body}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{props.buttonOption1}</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={()=> props.functionButtonOption()}>{props.buttonOption2}</button>
        </div>
        </div>
    </div>
    </div> 
    </>
  )
}
