import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

declare let bootstrap: any; // necesario para que typeScript no de error diciendo que no reconoce bootstrap


export const FormEmailLoggedIn = () => {


    const serviceId: string = 'service_8ymw9gn';// const serviceId: string = 'service_ad6dvf4';
    const templateId: string = 'contact_form';// const templateId: string = 'contact_form';
    const publicKey: string = 'Z5h6nUaQ9KoLIq2kN'; // const publicKey: string = 'ON-22qKjZUDzY0s6N';
    const [mensajeExito, setMensajeExito] = useState('');

    const user = useSelector((state: RootState) => state.auth.user);

    const form: any = useRef();

    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs
            .sendForm(serviceId, templateId, form.current, {
                publicKey: publicKey,
            })
            .then(
                () => {
                    console.log('MSJ DE CORREO ENVIADO EXITOSAMENTE');
                    setMensajeExito('Su consulta ha sido enviada con éxito.')
                    setTimeout(() => {
                        setMensajeExito('');
                        cleanForm();
                        closeModal();
                    }, 2000);
                },
                (error) => {
                    console.log('FAILED... NO SE PUDO MANDAR EL MSJ DE CORREO', error.text);
                },
            );
    };

    const closeModal = () => {
        let modalElement = document.getElementById('sentEmailModal');
        let modalBackdropElement = document.querySelector('body > div.modal-backdrop.fade.show');

        modalElement!.style.display = 'none';
        const modal = new bootstrap.Modal(modalElement!); // Esta linea y la de abajo son necesarias para evitar hacer clic 2 veces al boton de contactar (esto cuando ya se ha enviado un correo y se quiere mandar otro correo sin recargar la pag)
        modal.hide(); // linea de abajo: Oculta el modal de manera "oficial"
        modalBackdropElement?.remove(); //remueve el elemento encargado en colocar una capa oscura.
    }

    const cleanForm = () => {
        form.current.reset();
    };


    return (
        <>
      {/*  <!-- Button para activar el modal --> */}
      <button type="button" className="btn btn-outline-primary btn-sm " data-bs-toggle="modal" data-bs-target="#sentEmailModal">
        Contáctenos
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="sentEmailModal" tabIndex={-1} aria-labelledby="contactenosModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          {mensajeExito && (
            <div className="alert alert-success mt-2">{mensajeExito}</div>
          )}
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="contactenosModalLabel"> Contáctenos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form ref={form} id="modal-details" onSubmit={sendEmail}>
                <div className="mb-3">

                  <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                  <input type="text" name="from_name" className="form-control" id="nombre" required />

                  <label htmlFor="correoUsuario" className="col-form-label" >Correo electrónico:</label>
                  <input type="text" name="user_email" className="form-control" id="correoUsuario" value={user?.correo} readOnly />

                  <label htmlFor="asunto" className="col-form-label">Asunto:</label>
                  <input type="text" name="subject" className="form-control" id="asunto" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="texto-consulta" className="col-form-label">Consulta:</label>
                  <textarea className="form-control" name="message" id="texto-consulta" required></textarea>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" className="btn btn-primary" form="modal-details">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}