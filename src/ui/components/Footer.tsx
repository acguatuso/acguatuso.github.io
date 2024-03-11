import './Footer.css';


export const Footer = () => {

    const numero = 'sdsds'; //borrar

  return (

    <footer className='text-center text-lg-start bg-body-tertiary text-muted'>

        {/* Seccion: Redes Sociales */}
        <section className='d-flex justify-content-center justify-content-lg-between p-4 text-white border-botton redes-estilo'>
            {/* Izquierda */}
            <div className='me-5 d-none d-lg-block'>
                <span>Mantente conectado con nosotros por redes sociales</span>
            </div>
            {/* Izquierda */}

            {/* Derecha */}
            <div>
                <a href='https://www.facebook.com/uc.ag.39' className='me-4 text-reset'>  
                {/* <a href='{ facebookCantonal }' className='me-4 text-reset'>   */}
                    <i className='fab fa-facebook-f'> </i>
                </a>
            </div>
            {/* Derecha */}
        </section>
        {/* Seccion: Redes Sociales */}

        <section className ="">
            <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                    {/* Columna 1 */}
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className='text-uppercase fw-bold mb-4'>
                            <i className="fas fa-gem me-3"></i>Unión Cantonal de Asociaciones Guatuso {/* { nombreUnion } */}
                        </h6>
                        <p>
                            Ofrecemos servicios de capacitación tanto a las asociaciones del área como a los residentes de la comunidad Guatuso {/* { breveDesc } */}
                        </p>
                    </div>
                    {/* Columna 1 */}

                    {/* Columna 2 */}
                    {/* <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'> */}
                        {/* Links */}
                        {/* <h6 className="text-uppercase fw-bold mb-4">
                            Products
                        </h6>
                        <p>
                            <a href="#!" className='text-reset enlace-sin-subrayado'>A</a>
                        </p>
                        <p>
                            <a href="#!" className='text-reset enlace-sin-subrayado'>B</a>
                        </p>
                        <p>
                            <a href="#!" className='text-reset enlace-sin-subrayado'>C</a>
                        </p>
                        <p>
                            <a href="#!" className='text-reset enlace-sin-subrayado'>D</a>
                        </p>
                    </div>
 */}

                    {/* Columna 2 Horarios*/}
                    <div className='col-lg-3 col-md-6 mb-4'>
                        {/* Tabla */}
                        <h6 className="text-uppercase fw-bold mb-4">
                            Horario
                        </h6>
                        <table className='table horario-tabla'>
                            <tbody>
                                <tr>
                                    <td>Lun - Vie:</td> {/* {tablahorarios} */}
                                    <td>8am - 4pm</td>
                                </tr>
                                <tr>
                                    <td>Sab - Dom:</td>{/* {tablahorarios} */}
                                    <td>Cerrado</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Columna 2 Horarios*/}

                    {/* Columna 3 */}
                    <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                        {/* Links */}
                        <h6 className="text-uppercase fw-bold mb-4">
                            Contacto
                        </h6>
                        <p>
                            <i className='fas fa-home me-3'></i> Costa Rica, Alajuela, San Rafael {/* { direccion } */}
                        </p>
                        <p>
                            <i className='fas fa-envelope me-3'></i> ucag2022@gmail.com {/* { correo } */}
                        </p>
                        <p>
                            <i className='fas fa-phone me-3'></i> 4105-1157{/* {numero} */}
                        </p>
                        <p>
                            <i className='fa-brands fa-whatsapp me-3'></i> 8881-9000 {/* {whatsapp} */}
                        </p>
                    </div>
                    {/* Fin Columna 4 */}
                </div>
                {/* Fin Fila 1 */}
            </div>
        </section>

        {/* Copyright */}
        <div className='copyright-estilo'>
        © 2024 Copyright:
            <a className='text-reset enlace-sin-subrayado fw-bold'>CANtonal.com</a> {/* { sitioweb } */}
        </div>
        {/* Copyright */}
    </footer>
  )
}
