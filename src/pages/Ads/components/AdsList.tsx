import { adsSelector } from '../../../redux/reducers/adsSlice'
import { useAppSelector } from '../../../hooks/hooks'
import { AdsEditModal } from './AdsEditModal'
import { AdsDelete } from './AdsDelete';
import { ads } from '../ads.interface';
import { useEffect, useState } from 'react';
import { AdsLinkField } from './AdsLinkField';

export const AdsList = () => {
    const ads = useAppSelector(adsSelector)  
    
    const [links, setLinks] = useState<ads[]>([])      
    //se utiliza para que funcione el map con el delete correctamente
    useEffect(() => {
      setLinks(ads.adsList)
    }, [ads])
    
    return (
        
    <>   
    {ads.loading &&  <div>Cargando...</div>}
    {links.map((element: ads)=>{        
            return (                                  
                element.posicion_id  == 1 ?(
                    <div key={`${element.id}-div1-ads`} className="row mb-3 text-start">    
                    
                        <div className="col mb-3">
                            <img  className='img-fluid' src={element.download_url}/>           
                        </div>            
                        <div className="col mb-3">                        
                            <h3>{element.titulo}</h3>
                            <p className='lead'><strong>{element.subtitulo}</strong></p>
                            <p className='lead'>{element.descripcion}</p>
                            
                            <button className="btn btn-primary btn-sm mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${element.id}`} aria-expanded="false" aria-controls={`collapse-${element.id}`}>
                                Enlaces de interés
                            </button>
                            <div className="collapse" id={`collapse-${element.id}`}>
                                <div className="card card-body">
                                    <AdsLinkField
                                    key={`${element.id}-ads-linkfield1`}
                                    link={element.links}                        
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="row"> */}
                        <AdsEditModal
                            key={`${element.id}-adssection1-ads`} 
                            id = {element.id}
                            posicion_id={element.posicion_id}           
                            descripcion= {element.descripcion} 
                            estado= {element.estado} 
                            image_url= {element.image_url}
                            subtitulo= {element.subtitulo}
                            titulo= {element.titulo}
                            download_url={element!.download_url}   
                            links={element.links}                 
                        />     
                        <AdsDelete
                            key={`${element.id}-delete1-ads`}
                            id={element.id}
                            image_url={element.image_url}
                        />
                        {/* </div> */}

                    <hr className="border border-secondary border-1 opacity-90"/>

                    </div>                 
                )
                    
                    :
        
                (    
                    <div key={`${element.id}-div2-ads`} className="row mb-3 text-end">
                    <div className="col mb-3">                        
                        <h3>{element.titulo}</h3>
                        <p className='lead'><strong>{element.subtitulo}</strong></p>
                        <p className='lead'>{element.descripcion}</p>

                        <button className="
                        
                        btn btn-primary btn-sm mb-2" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${element.id}`} aria-expanded="false" aria-controls={`collapse-${element.id}`}>
                                Enlaces de interés
                        </button>
                        <div className="collapse mb-2" id={`collapse-${element.id}`}>
                            <div className="card card-body">
                            <AdsLinkField
                            key={`${element.id}-ads-linkfield2`}
                            link={element.links}                        
                            />
                            </div>
                        </div>



                    </div>
                    <div className="col m-3">        
                        <img  className='img-fluid' src={element.download_url}/>
                    </div>
                    
                    <AdsEditModal                
                        key={`${element.id}-adssection2-ads`} 
                        id = {element.id}
                        posicion_id={element.posicion_id}           
                        descripcion= {element.descripcion} 
                        estado= {element.estado} 
                        image_url= {element.image_url}
                        subtitulo= {element.subtitulo}
                        titulo= {element.titulo}
                        download_url={element.download_url}
                        links={element.links}
                    />
                    <AdsDelete
                        key={`${element.id}-delete2-ads`}
                        id={element.id}
                        image_url={element.image_url}
                    /> 
                    
                    <hr className="border border-secondary border-1 opacity-90"/>
                    </div> 
                )                                           
            )     
        })
    } 
    </>
    )
}
