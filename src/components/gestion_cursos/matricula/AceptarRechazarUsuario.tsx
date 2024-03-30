
interface ModalProps {
    mostrar: boolean;
    onClose: () => void;
    usuario: any;
}

export const AceptarRechazarUsuario: React.FC<ModalProps> = ({mostrar, onClose, usuario}) => {
    
    const handleClickAceptar = () => {
        onClose();
    }

    const handleClickRechazar = () => {
        onClose();
    }
    
    
    return (
    <>
        {mostrar && (
            <>
            <div className="modal-backdrop fade show"></div>
                <div className={`modal d-block`} tabIndex={-1} style={{ display: 'block' }}>
             <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
              <h5 className="modal-title">Detalles del aspirante a Matricular</h5>
              {onClose && <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>}
                </div>
                <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>Cédula:</strong> {usuario.cedula}</p>
                  </div>
                  <div className="col">
                    <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                    <p><strong>Correo:</strong> {usuario.correo}</p>
                  </div>
                </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={handleClickRechazar}>Rechazar</button>
                    <button type="button" className="btn btn-success" onClick={handleClickAceptar}>Aceptar</button>
                </div>
              </div>
            </div> 
          </div>
            </>
        )}
    </>
  )
}
