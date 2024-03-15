import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

/*
export const CorreosApp = () => {
    
  return (
    <form ref={form} onSubmit={sendEmail}>
    <label>Name</label>
    <input type="text" name="from_name" />
    <label>Email</label>
    <input type="email" name="user_email" />
    <label>Asunto</label>
    <input type="text" name="subject" />
    <label>Message</label>
    <textarea name="message" />
    <input type="submit" value="Send" />
    </form>
    
    
    )
  }
  */
 
 export const SentEmail = () => {

  const serviceId: string = 'service_8ymw9gn';
  const templateId: string = 'contact_form';
  const publicKey: string = 'Z5h6nUaQ9KoLIq2kN';


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
         },
         (error) => {
           console.log('FAILED...', error.text);
         },
       );
   };
  return (
    <>
        <h1>SentEmailComponent</h1>

       {/*  <!-- Button para activar el modal --> */}
        <button type="button" className="btn btn-link btn-sm" data-bs-toggle="modal" data-bs-target="#sentEmailModal">
            Contáctenos
        </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="sentEmailModal" tabIndex={-1} aria-labelledby="contactenosModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="contactenosModalLabel">Contáctenos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...

              <form ref={form}>
                <div className="mb-3">
                  
                  <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                  <input type="text" name = "from_name" className="form-control" id="nombre"/>

                  <label htmlFor="correoUsuario" className="col-form-label">Correo electrónico:</label>
                  <input type="text" name = "user_email" className="form-control" id="correoUsuario"/>

                  <label htmlFor="asunto" className="col-form-label">Asunto:</label>
                  <input type="text" name = "subject" className="form-control" id="asunto"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="texto-consulta" className="col-form-label">Consulta:</label>
                  <textarea className="form-control" name="message" id="texto-consulta"></textarea>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={sendEmail} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
    





    


  )
}
