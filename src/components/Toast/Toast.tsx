import { toastProps } from "./toast.interface"

export const Toast = (props: toastProps) => {
  return (
    <>
    {/* 
    Ademas de realizar el alert
    Se debe de agregar algun boton con id props.id
    <button type="button" className="btn btn-primary" id="liveToastBtn">Show live toast</button> */}

    <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
        <div id={props.id} className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
            <img src="../../assets/LogoUCAG.png" className="rounded me-2" alt="..."/>
            <strong className="me-auto">{props.title}</strong>
            <small>{props.subject}</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
            {props.message}
            </div>
        </div>
    </div>
    </>
  )
}
