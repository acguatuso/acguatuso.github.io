import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

 export const SentEmail = () => {

  const serviceId: string = 'service_8ymw9gn';
  const templateId: string = 'contact_form';
  const publicKey: string = 'Z5h6nUaQ9KoLIq2kN';
  const [showButton, setShowButton] = useState(true);

   const form: any = useRef();

   const sendEmail = (e:any) => {
     e.preventDefault();

     emailjs
       .sendForm(serviceId, templateId, form.current, {
         publicKey: publicKey,
       })
       .then(
         () => {
           console.log('SUCCESS!');
           setShowButton(false);
         },
         (error) => {
           console.log('FAILED...', error.text);
         },
       );
   };

   const handleSubmitButton = () => {
    setShowButton(true);
   }

  return (
    <>
       {/*  <!-- Button para activar el modal --> */}
        <button type="button" className="btn btn-outline-primary btn-sm " data-bs-toggle="modal" data-bs-target="#sentEmailModal">
            Contáctenos
        </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="sentEmailModal" tabIndex={-1} aria-labelledby="contactenosModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="contactenosModalLabel"> Contáctenos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form ref={form} id="modal-details" onSubmit={sendEmail}>
                <div className="mb-3">
                  
                  <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                  <input type="text" name = "from_name" className="form-control" id="nombre" required/>

                  <label htmlFor="correoUsuario" className="col-form-label" >Correo electrónico:</label>
                  <input type="email" name = "user_email" className="form-control" id="correoUsuario" placeholder="Ej: usuario@email.com" required/>

                  <label htmlFor="asunto" className="col-form-label">Asunto:</label>
                  <input type="text" name = "subject" className="form-control" id="asunto" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="texto-consulta" className="col-form-label">Consulta:</label>
                  <textarea className="form-control" name="message" id="texto-consulta" required></textarea>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleSubmitButton} data-bs-dismiss="modal">Cerrar</button>
              {showButton && (
                <button type="submit" className="btn btn-primary" form="modal-details">Enviar</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
