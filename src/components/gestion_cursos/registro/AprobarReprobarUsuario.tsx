import { useEffect, useState } from "react";
import { updateFirebaseDoc } from "../../../api/updateFirebaseDoc/updateFirebaseDoc";
import NotificationModal from "../../Modal/NotificationModal";


interface ModalProps {
    mostrar: boolean;
    onClose: () => void;
    usuario: any;
    usuariosAprobados: string[];
    usuariosReprobados: string[];
    idCurso: string;
    nombreCurso: string;
}

export const AprobarReprobarUsuario: React.FC<ModalProps> = ({ mostrar, onClose, usuario, usuariosAprobados, usuariosReprobados, idCurso, nombreCurso }) => {

    const rutaDocumentoFirebase = `Cursos/${idCurso}`;

    const [mostrarNotificacion, setMostrarNotificacion] = useState(false); // opcion 1 modal de notificacion
    const [mensajeExito, setMensajeExito] = useState(''); // opcion 2, mensaje de exito... Consutarlo con los compa;eros

    const [loading, setLoading] = useState(false);

    const [aprobadosLocal, setAprobadosLocal] = useState<string[]>([]);
    const [reprobadosLocal, setReprobadosLocal] = useState<string[]>([]);

    useEffect(() => {
        // Actualizar aprobados y reprobados locales al recibir nuevos datos
        setAprobadosLocal(usuariosAprobados);
        setReprobadosLocal(usuariosReprobados);
    }, [usuariosAprobados, usuariosReprobados]);

    const isAprobado = usuario?.id && aprobadosLocal.includes(usuario.id);
    const isReprobado = usuario?.id && reprobadosLocal.includes(usuario.id);
    // console.log({isAprobado})

    const handleClickAprobar = async () => {

        // console.log({aprobadosLocal})
        setLoading(true);

        // En caso de que el alumno se encuentre en Reprobado y lo quieran aprobar. Quita al alumno de Reprobados en la BD
        if (isReprobado) {
            const seleccion = confirm('¿Está seguro de Aprobar al usuario?');
            if (seleccion) {
                try {
                    const newReprobados = reprobadosLocal.filter(id => id !== usuario.id);
                    await updateFirebaseDoc(rutaDocumentoFirebase, { reprobados: newReprobados });
                    setReprobadosLocal(newReprobados); // Actualiza el estado global de reprobados

                } catch (error) {
                    console.error('(Caso: Alumno anteriormente Reprobado): Error al Aprobar alumno en Firebase:', error);
                }
            }
        }

        // agrega al alumno a Aprobados en la BD
        try {
            const newAprobados = [...aprobadosLocal, usuario.id];
            await updateFirebaseDoc(rutaDocumentoFirebase, { aprobados: newAprobados });
            //console.log({newAprobados})
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

        setLoading(true);
       
        // en caso de que el alumno estaba aprobado y quieren reprobarlo.
        // console.log({isAprobado})
        if (isAprobado) {
            const seleccion = confirm('¿Está seguro de Reprobar al usuario?');
            if (seleccion) {
                try {
                    const newAprobados = aprobadosLocal.filter(id => id !== usuario.id);
                    await updateFirebaseDoc(rutaDocumentoFirebase, { aprobados: newAprobados });
                    setAprobadosLocal(newAprobados); // Actualiza el estado global de aprobados
                    //setMensajeExito('El estudiante ha sido Reprobado.');    
                } catch (error) {
                    console.error('(Caso: Alumno anteriormente Aprobado): Error al reprobar alumno en Firebase:', error);
                }
            }
        }


        // agrega al alumno a Reprobados en la BD
        try {
            const newReprobados = [...reprobadosLocal, usuario.id];
            await updateFirebaseDoc(rutaDocumentoFirebase, { reprobados: newReprobados });
            //console.log({newReprobados})
            //setMostrarNotificacion(true);
            setMensajeExito('El estudiante ha sido Reprobado.');
            setTimeout(() => {
                setReprobadosLocal(newReprobados);
            }, 3000);
        } catch (error) {
            console.error('Error al actualizar reprobados en Firebase:', error);
        }

        setTimeout(() => {

            setMostrarNotificacion(false);
            setLoading(false);
            setMensajeExito('');
            onClose();
        }, 2500);

        setTimeout(async () => {
            setLoading(false);
            onClose();
        }, 2000);
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
                                            {isReprobado ? (
                                                <>
                                                    <button type="button" className="btn btn-success" onClick={handleClickAprobar} disabled={loading}>Aprobar</button>
                                                    <button type="button" className="btn btn-secondary" onClick={handleClickCerrar} disabled={loading}>Cancelar</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button type="button" className="btn btn-danger" onClick={handleClickRechazar} disabled={loading}>Reprobar</button>
                                                    <button type="button" className="btn btn-success" onClick={handleClickAprobar} disabled={loading}>Aprobar</button>
                                                </>
                                            )}
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
