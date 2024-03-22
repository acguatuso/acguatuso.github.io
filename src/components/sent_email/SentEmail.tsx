import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

declare let bootstrap: any; // necesario para que typeScript no de error diciendo que no reconoce bootstrap

export const SentEmail = () => {

  const serviceId: string  = 'service_ad6dvf4';
  const templateId: string = 'contact_form';
  const publicKey: string  = 'ON-22qKjZUDzY0s6N';

      /*Email de Cantonal*/
  // const serviceId: string = 'service_8ymw9gn';
  // const templateId: string = 'contact_form';
  // const publicKey: string = 'Z5h6nUaQ9KoLIq2kN'; 
      /*Email de Cantonal*/
  const [mensajeExito, setMensajeExito] = useState('');

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
    const modalElement = document.getElementById('sentEmailModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  const cleanForm = () => {
    console.log("LIMPIANDO EL FORM")
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
                  <input type="email" name="user_email" className="form-control" id="correoUsuario" placeholder="Ej: usuario@email.com" required />

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
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cleanForm}>Cerrar</button>
              <button type="submit" className="btn btn-primary" form="modal-details">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
