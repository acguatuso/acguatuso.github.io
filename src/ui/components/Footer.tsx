import './Footer.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getFirebaseDoc } from '../../utils/getFirebaseDoc/getFirebaseDoc';


export const Footer = () => {

    const [correo, setCorreo] = useState('')
    const [facebookUrl, setFacebookUrl] = useState('');
    const [tituloPrincipal, setTituloPrincipal] = useState('');
    const [subtituloPrincipal, setSubtituloPrincipal] = useState('');
    const [telefonoFijo, setTelefonoFijo] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [direccionCorta, setDireccionCorta] = useState('');
    const [horarioLunes, setHorarioLunes] = useState('');
    const [horarioMartes, setHorarioMartes] = useState('');
    const [horarioMiercoles, setHorarioMiercoles] = useState('');
    const [horarioJueves, setHorarioJueves] = useState('');
    const [horarioViernes, setHorarioViernes] = useState('');
    const [horarioSabado, setHorarioSabado] = useState('');
    const [horarioDomingo, setHorarioDomingo] = useState('');

    // Redux Hooks & Access
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        (async() => {
            const docSnap = await getFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv');

            setCorreo(docSnap?.correo);
            setFacebookUrl(docSnap?.redes[0].red_url);
            setTituloPrincipal(docSnap?.titulo_principal);
            setSubtituloPrincipal(docSnap?.subtitulo_principal);
            setTelefonoFijo(docSnap?.telefonos[0]);
            setWhatsapp(docSnap?.telefonos[1]);
            setDireccionCorta(docSnap?.direccion_corta);
            setHorarioLunes(docSnap?.horarios[0]);
            setHorarioMartes(docSnap?.horarios[1]);
            setHorarioMiercoles(docSnap?.horarios[2]);
            setHorarioJueves(docSnap?.horarios[3]);
            setHorarioViernes(docSnap?.horarios[4]);
            setHorarioSabado(docSnap?.horarios[5]);
            setHorarioDomingo(docSnap?.horarios[6]);
    })()
    }, []);

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
                    <a href={ facebookUrl } className='me-4 text-reset'>  
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
                                <i className="fas fa-gem me-3"></i>{ tituloPrincipal }
                            </h6>
                            <p>
                                { subtituloPrincipal }
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
                                 { horarioLunes }
                            </p>
                            <p className="mb-1">
                                { horarioMartes }
                            </p>
                            <p className="mb-1">
                                { horarioMiercoles }
                            </p>
                            <p className="mb-1">
                                { horarioJueves }
                            </p>
                            <p className="mb-1">
                                { horarioViernes }
                            </p>
                            <p className="mb-1">
                                { horarioSabado }
                            </p>
                            <p className="mb-1">
                                { horarioDomingo }
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
                                <i className='fas fa-home me-3'></i> { direccionCorta }
                            </p>
                            <p>
                                <i className='fas fa-envelope me-3'></i> { correo }
                            </p>
                            <p>
                                <i className='fas fa-phone me-3'></i> { telefonoFijo }
                            </p>
                            <p>
                                <i className='fa-brands fa-whatsapp me-3'></i> {whatsapp}
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
