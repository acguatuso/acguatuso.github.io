import { AdSectionEditModal } from './AdSectionEditModal';
import { AdSectionDelete } from './AdSectionDelete';
import { sectionsData } from './about.interface';
//import { getFirebaseImage } from '../../../api/getFirebaseImage/getFirebaseImage';
//import { useState, useEffect } from 'react';




export const AdSection = (props: sectionsData,image_url_list: string[]) => {    

    return (
    <>    
    {
    props.posicion_id  == 1 ?

    <div className="row mb-3 border">        
        <div className="col">                        
            <h5>{props.titulo}</h5>
            <h6>{props.subtitulo}</h6>
            <p>{props.descripcion}</p>
        </div>
        <div className="col">
        
            <img  className='img-thumbnail' src={props!.download_url}/>
            <AdSectionEditModal                
                    key={props.id} 
                    id = {props.id}
                    posicion_id={props.posicion_id}           
                    descripcion= {props.descripcion} 
                    estado= {props.estado} 
                    image_url= {props.image_url}
                    subtitulo= {props.subtitulo}
                    titulo= {props.titulo}
                    {...image_url_list}            
                />
                <AdSectionDelete id={props.id}/>
        </div>                                    
    </div>

        :
    
    <div className="row mb-3 border">        
        <div className="col">
            <img  className='img-thumbnail' src={props!.download_url}/>        
            <AdSectionDelete id={props.id}/>
            <AdSectionEditModal
            key={props.id} 
            id = {props.id}
            posicion_id={props.posicion_id}           
            descripcion= {props.descripcion} 
            estado= {props.estado} 
            image_url= {props.image_url}
            subtitulo= {props.subtitulo}
            titulo= {props.titulo}
            {...image_url_list}
            />    
        </div>            
        <div className="col">                        
            <h5>{props.titulo}</h5>
            <h6>{props.subtitulo}</h6>
            <p>{props.descripcion}</p>
        </div>                      
    </div>
 
    }
    </>
  )


}

