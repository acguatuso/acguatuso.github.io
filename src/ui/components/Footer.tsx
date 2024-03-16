import './Footer.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchEmpresaData } from '../../redux/reducers/empresaSlice';


export const Footer = () => {

    const dispatch = useDispatch();
    
    // Redux Hooks & Access
    const user = useSelector((state: RootState) => state.auth.user);
    const empresaData = useSelector((state: RootState) => state.empresa.data);
    
    useEffect(() => {
        dispatch(fetchEmpresaData() as any );
    },[]);

  return (

    <div className='footer-container'>

        {user && (
        <footer className='text-center text-lg-start bg-body-tertiary text-muted footer-ancho footer-container'>

            {/* Seccion: Redes Sociales */}
            <section className='d-flex justify-content-center justify-content-lg-between p-4 text-white border-botton bg-dark /* redes-estilo */'>
                {/* Izquierda */}
                <div className='me-5 d-none d-lg-block'>
                    <span>Mantente conectado con nosotros por redes sociales</span>
                </div>
                {/* Izquierda */}

                {/* Derecha */}
                <div>
                    <a href={ empresaData?.facebookUrl } className='me-4 text-reset'>  
                        <i className='fab fa-facebook-f facebook-color'> </i>
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
                                <i className="fas fa-gem me-3"></i>{ empresaData?.titulo_footer }
                            </h6>
                            <p>
                                { empresaData?.subtitulo_footer }
                            </p>
                        </div>
                        {/* Columna 1 */}

                        {/* Columna 2 Horarios*/}
                        <div className='col-lg-3 col-md-6 mb-4'>
                            {/* Tabla */}
                            <h6 className="text-uppercase fw-bold mb-4">
                                Horario
                            </h6>
                            {/* <table className='table horario-tabla'>
                                <tbody>
                                    <tr>
                                        <td>Lun - Vie:</td>
                                        <td>8am - 4pm</td>
                                    </tr>
                                    <tr>
                                        <td>Sab - Dom:</td>
                                        <td>Cerrado</td>
                                    </tr>
                                </tbody>
                            </table> */}
                            <p className="mb-1">
                                 { empresaData?.horarioLunes }
                            </p>
                            <p className="mb-1">
                                { empresaData?.horarioMartes }
                            </p>
                            <p className="mb-1">
                                { empresaData?.horarioMiercoles }
                            </p>
                            <p className="mb-1">
                                { empresaData?.horarioJueves }
                            </p>
                            <p className="mb-1">
                                { empresaData?.horarioViernes }
                            </p>
                            <p className="mb-1">
                                { empresaData?.horarioSabado }
                            </p>
                            <p className="mb-1">
                                { empresaData?.horarioDomingo }
                            </p>
                        </div>
                        {/* Columna 2 Horarios*/}

                        {/* Columna 3 */}
                        <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                            {/* Links */}
                            <h6 className="text-uppercase fw-bold mb-4">
                                Contacto
                            </h6>
                            <p>
                                <i className='fas fa-home me-3'></i> { empresaData?.direccionCorta }
                            </p>
                            <p>
                                <i className='fas fa-envelope me-3'></i> { empresaData?.correo }
                            </p>
                            <p>
                                <i className='fas fa-phone me-3'></i> { empresaData?.telefonoFijo }
                            </p>
                            <p>
                                <i className='fa-brands fa-whatsapp me-3'></i> {empresaData?.whatsapp}
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
        )}
    </div>
  )
}
