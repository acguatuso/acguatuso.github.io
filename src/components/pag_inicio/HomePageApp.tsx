
import { useState, useRef, useEffect } from 'react';
import { HomePageEdit } from './';
import './HomePageApp.css'
import { getFirebaseDoc } from '../../api/getFirebaseDoc/getFirebaseDoc';

export const HomePageApp = () => {

    //informacion de FireStore
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [image_url, setImageUrl] = useState('');

    useEffect(() => {
        (async() => {
            const docSnap = await getFirebaseDoc('/Home/8Yl9xbZuRNFTUItTEKGU');

            setTitulo(docSnap?.titulo);
            setDescripcion(docSnap?.descripcion);
            setImageUrl(docSnap?.image_url);
            console.log(image_url);
        })()
    }, []);

    const [showEditPage, setShowEditPage ] = useState(false);
    const editRef = useRef<any>(null);


    const handleEditClick = () => {
        setShowEditPage(true);
        if (editRef.current){
            editRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    };

  return (
    <div className="container mt-5">
        {/* Boton de editar */}
        <div className='text-start mb-5'>
            <button type="button" className='btn btn-success' onClick={handleEditClick}>Editar</button>
        </div>

        <div className="row text-start">
            {/* Contenido del lado izquierdo */}
            <div className="col-sm-5">
                <h2 className='fw-bold color-title mb-3'>{ titulo }</h2>
                <p>{ descripcion } </p>
            </div>

            {/* Contenido del lado derecho */}
            <div className="col-sm-7" ref={editRef}>
                <img 
                    src={image_url} 
                    alt="Imagen de página de inicio,"
                    className='img-fluid rounded'
                    />
            </div>
            {showEditPage && <HomePageEdit />}
        </div>
    </div>

  )
}
