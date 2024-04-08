import { useEffect, useState } from "react";
import { updateFirebaseDoc } from "../../../api/updateFirebaseDoc/updateFirebaseDoc";
import NotificationModal from "../../Modal/NotificationModal";


interface ModalProps {
    mostrar: boolean;
    onClose: () => void;
    usuario: any;
    //usuariosMatriculados: string[];
    usuariosAprobados: string[];
    idCurso: string;
    nombreCurso: string;
}

export const AprobarReprobarUsuario: React.FC<ModalProps>  = ({ mostrar, onClose, usuario, usuariosAprobados, /* usuariosMatriculados ,*/ idCurso, nombreCurso }) => {
//   //console.log("DPG", idCurso);
  const rutaDocumentoFirebase = `Cursos/${idCurso}`;
//   //console.log('RUTA DEL CURSO: ', rutaDocumentoFirebase);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false); // opcion 1 modal de notificacion
  const [mensajeExito, setMensajeExito] = useState(''); // opcion 2, mensaje de exito... Consutarlo con los compa;eros

   const [loading, setLoading] = useState(false);
//   const [matriculadosLocal, setMatriculadosLocal] = useState<string[]>([]);
const [aprobadosLocal, setAprobadosLocal] = useState<string []>([]);

  useEffect(() => {
    // Actualizar aprobados locales al recibir nuevos datos
//     setMatriculadosLocal(usuariosMatriculados);
    setAprobadosLocal(usuariosAprobados);
  }, [usuariosAprobados]);

//   const isMatriculado = usuario?.id && matriculadosLocal.includes(usuario.id)//usuariosMatriculados.includes(usuario.id);
    const isAprobado = usuario?.id && aprobadosLocal.includes(usuario.id);
    const isReprobado = false;
    // console.log({isAprobado})

   const handleClickAprobar = async () => {
    
    // console.log({aprobadosLocal})
    setLoading(true);

    try {
      const newAprobados = [...aprobadosLocal, usuario.id];
      await updateFirebaseDoc(rutaDocumentoFirebase, { aprobados: newAprobados });
      console.log({newAprobados})
      setMostrarNotificacion(true);
      setTimeout(() => {
        setAprobadosLocal(newAprobados);
      }, 3000);
    } catch (error) {
      console.error('Error al actualizar aprobados en Firebase:', error);
    }

    setTimeout(() => {

      setMostrarNotificacion(false);
      setLoading(false);
      onClose();
    }, 2500);
   }

   const handleClickRechazar = async () => {
//     //TODO
//     const seleccion = confirm('¿Está seguro de desmatricular/rechazar al usuario?');
    
//     if (seleccion){

//       setLoading(true);
//       //console.log('Nombre del usuario: ', usuario.nombre, 'correo: ', usuario.correo)
  
//       // Verificar si el usuario está matriculado antes de intentar eliminarlo
//       if (!matriculadosLocal.includes(usuario.id)) {
//         console.warn('El usuario no está matriculado, no es necesario rechazarlo.');
//         setLoading(false);
//         onClose();
//         await SentEmailCoursesRejected(usuario.nombre, usuario.correo, nombreCurso); 
//         return; 
//       }
  
//       try {
//         const newMatriculados = matriculadosLocal.filter(id => id !== usuario.id);
//         //console.log('ESTAMOS EN RECHAZAR: ', newMatriculados)
//         await updateFirebaseDoc(rutaDocumentoFirebase, { matriculados: newMatriculados });
//         setMatriculadosLocal(newMatriculados); // Actualiza el estado global de matriculados
//         setMensajeExito('Se ha desmatriculado el usuario.');
  
//         // onClose();
//       } catch (error) {
//         console.error('Error al actualizar matriculados en Firebase:', error);
//       }
      
      
      
  
//       setTimeout(async () => {
//         const enviadoExitoso = await SentEmailCoursesRejected(usuario.nombre, usuario.correo, nombreCurso);
//         console.log(enviadoExitoso);
//         setMensajeExito('');
  
//         setLoading(false);
//         onClose();
//       }, 2000);
//     }
    
   }

const handleClickCerrar = () => {
    onClose();
}

  const handleAceptar = () => {
    setMostrarNotificacion(false);
  }
  
    return (
        <>
       {mostrar && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className={`modal d-block`} tabIndex={-1} style={{ display: 'block' }}>
             <div className="modal-dialog modal-dialog-centered modal-lg">
               <div className="modal-content">
                 {mensajeExito && (
                   <div className="alert alert-success mt-2">{mensajeExito}</div>
                 )}
                 <div className="modal-header">
                   <h5 className="modal-title">Detalles del estudiante</h5>
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
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: isAprobado ? 'green' : isReprobado ? 'red' : 'grey' }}>
                     {isAprobado ? 'Aprobado en el curso' : isReprobado ? 'Reprobado en el curso' : 'Usuario en espera de evaluación'}</p>
                 
                 </div>
                 <div className="modal-footer">
                     {isAprobado ? (
                        <>
                         <button type="button" className="btn btn-danger" onClick={handleClickRechazar} disabled={loading}>Reprobar</button>
                         <button type="button" className="btn btn-secondary" onClick={handleClickCerrar} disabled={loading}>Cancelar</button>
                        </>
                     ) : (
                        <>
                         <button type="button" className="btn btn-danger" onClick={handleClickRechazar} disabled={loading}>Reprobar</button>
                         <button type="button" className="btn btn-success" onClick={handleClickAprobar} disabled={loading}>Aprobar</button>
                        </>
                     )}
                 </div>
               </div>
             </div>
           </div>
           <NotificationModal
             texto="Se ha aprobado al estudiante."
             mostrar={mostrarNotificacion}
             onConfirm={handleAceptar}
           />
        </>
      )}
    </>
  )
}
