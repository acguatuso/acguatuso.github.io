
import { useState, useRef } from 'react';
import { HomePageEdit } from '.';
import './HomePage.css'

export const HomePage = () => {
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
                <h2 className='fw-bold color-title mb-3'>Titulo Titulo Titulo Titulo Titulo Titulo Titulo </h2>
                <p>Aqui va la descripcion de la pantalla de inicio.... </p>
            </div>

            {/* Contenido del lado derecho */}
            <div className="col-sm-7" ref={editRef}>
                <img 
                    src="/src/assets/turismo.jpg" 
                    alt="Imagen de página de inicio,"
                    className='img-fluid rounded'
                    />
            </div>
            {showEditPage && <HomePageEdit />}
        </div>
    </div>

  )
}
