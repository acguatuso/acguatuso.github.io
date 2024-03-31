import { useState, useEffect } from 'react';
import { updateFirebaseDoc } from '../../../api/updateFirebaseDoc/updateFirebaseDoc';
import NotificationModal from '../../Modal/NotificationModal';

interface ModalProps {
  mostrar: boolean;
  onClose: () => void;
  usuario: any;
  usuariosMatriculados: string[];
  idCurso: string;
}

export const AceptarRechazarUsuario: React.FC<ModalProps> = ({ mostrar, onClose, usuario, usuariosMatriculados, idCurso }) => {

  //console.log("DPG", idCurso);
  const rutaDocumentoFirebase = `Cursos/${idCurso}`;
  //console.log('RUTA DEL CURSO: ', rutaDocumentoFirebase);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false); // opcion 1 modal de notificacion
  const [mensajeExito, setMensajeExito] = useState(''); // opcion 2, mensaje de exito... Consutarlo con los compa;eros

  const [loading, setLoading] = useState(false);
  const [matriculadosLocal, setMatriculadosLocal] = useState<string[]>([]);

  useEffect(() => {
    // Actualizar matriculados locales al recibir nuevos datos
    setMatriculadosLocal(usuariosMatriculados);
  }, [usuariosMatriculados]);

  const isMatriculado = usuario?.id && matriculadosLocal.includes(usuario.id)//usuariosMatriculados.includes(usuario.id);

  const handleClickAceptar = async () => {
    //console.log('Estoy en el modal con los usuarios Matriculados: ', usuariosMatriculados)
    //TODO
    setLoading(true);

    try {
      const newMatriculados = [...matriculadosLocal, usuario.id]//[...usuariosMatriculados, usuario.id];
      await updateFirebaseDoc(rutaDocumentoFirebase, { matriculados: newMatriculados });
      //console.log('NEW MATRICULADOS: ',newMatriculados)
      setMostrarNotificacion(true);


      setTimeout(() => {
        setMatriculadosLocal(newMatriculados);

      }, 3000);
      //onClose();
    } catch (error) {
      console.error('Error al actualizar matriculados en Firebase:', error);
    }

    setTimeout(() => {

      setMostrarNotificacion(false);
      setLoading(false);
      onClose();
    }, 2500);
  }

  const handleClickRechazar = async () => {
    //TODO
    setLoading(true);

    // Verificar si el usuario está matriculado antes de intentar eliminarlo
    if (!matriculadosLocal.includes(usuario.id)) {
      console.warn('El usuario no está matriculado, no es necesario rechazarlo.');
      setLoading(false);
      onClose();
      return;
    }

    try {
      const newMatriculados = matriculadosLocal.filter(id => id !== usuario.id);
      //console.log('ESTAMOS EN RECHAZAR: ', newMatriculados)
      await updateFirebaseDoc(rutaDocumentoFirebase, { matriculados: newMatriculados });
      setMatriculadosLocal(newMatriculados); // Actualiza el estado global de matriculados
      setMensajeExito('Se ha desmatriculado el usuario.');

      // onClose();
    } catch (error) {
      console.error('Error al actualizar matriculados en Firebase:', error);
    }

    setTimeout(() => {
      setMensajeExito('');

      setLoading(false);
      onClose();
    }, 2000);
  }

  const handleClickCerrar = () => {
    onClose();
  }

  const handleAceptar = () => {
    setMostrarNotificacion(false);
  }

  //modal
  return (
    <>
      {mostrar && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className={`modal d-block`} tabIndex={-1} style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              {/* mensaje de exito o alerta van aqui */}

              <div className="modal-content">
                {mensajeExito && (
                  <div className="alert alert-success mt-2">{mensajeExito}</div>
                )}
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
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: isMatriculado ? 'green' : 'red' }}>
                    {isMatriculado ? 'Usuario ya se encuentra matriculado' : 'Usuario no se encuentra matriculado'}</p>
                </div>
                <div className="modal-footer">
                  {isMatriculado ? (
                    <>
                      <button type="button" className="btn btn-secondary" onClick={handleClickCerrar}>Cerrar</button>
                      <button type="button" className="btn btn-danger" onClick={handleClickRechazar} disabled={loading}>Desmatricular</button>

                    </>
                  ) : (
                    <>
                      <button type="button" className="btn btn-danger" onClick={handleClickRechazar} disabled={loading}>Rechazar</button>
                      <button type="button" className="btn btn-success" onClick={handleClickAceptar} disabled={loading}>Matricular</button>

                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <NotificationModal
            texto="Se ha matriculado el usuario."
            mostrar={mostrarNotificacion}
            onConfirm={handleAceptar}
          />
        </>
      )}
    </>
  )
}
