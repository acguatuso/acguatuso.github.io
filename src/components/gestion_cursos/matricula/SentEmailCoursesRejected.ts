import emailjs from '@emailjs/browser';

export const SentEmailCoursesRejected = () : Promise<boolean> => {

    // const serviceId: string  = 'service_ad6dvf4';
    // const templateId: string = 'contact_form';
    // const publicKey: string  = 'ON-22qKjZUDzY0s6N';
         /*Email de Cantonal Matriculas*/
  const serviceId: string = 'service_dkr0wxb';
  const templateId: string = 'template_matricula_r'; // Rechazadas
  const publicKey: string = 'd2Zek1yZFLVAozcHY'; 
      /*Email de Cantonal MAtriculas*/  
    const information = {
        user_email: 'davidega12@gmail.com',
        user_name: 'David',
        message: 'Si tiene dudas, contáctese con el equipo de la Unión Cantonal',
        nombre_curso: 'Aprendiendo Japonés'
    };

        return new Promise((resolve, reject) => {
            
            emailjs
                .send(serviceId, templateId, information, publicKey,
                )
                .then(
                    () => {
                        console.log('MSJ DE CORREO ENVIADO EXITOSAMENTE');
                        resolve(true);
                    },
                    (error) => {
                        console.log('FAILED... NO SE PUDO MANDAR EL MSJ DE CORREO', error.text);
                        reject(false);
                    },
                );
        })
}
