import { useEffect, useState } from 'react';
import { getFirebaseDoc } from '../../utils/getFirebaseDoc/getFirebaseDoc';
import { sectionsData } from '../../pages/About/About';

export const SectionModal = (props: sectionsData) => {
    
    useEffect(() => {
          
    }, [])
    

    return (
    <>
      
    <div className="row">
        <div className="col-sm">                        
            <h5>{props.titulo}</h5>
            <h6>{props.subtitulo}</h6>
            <p>{props.descripcion}</p>
        </div>
        <div className="col-sm">
            <img  className='img-thumbnail' src='https://mdbcdn.b-cdn.net/img/new/slides/003.webp'/>
        </div>
    </div>               
                       
                                          
    
        <div className="row">
        <div className="col">
        Telefono,Direccion,Email,Horario de Atencion
        </div>

    </div>
    </>
  )
}
