import { AdSectionEditModal } from './AdSectionEditModal';
import { AdSectionDelete } from './AdSectionDelete';
import { adSection } from './about.interface';

export const AdSection = (props: adSection) => {    
    const handleAux1 = () => {
        console.log('handleaux1')
        props.globalStateFunction2()
    }
    const handleAux2 = () => {
        console.log('handleaux2')
        props.globalStateFunction2()
    }
    return (
    <>    
    {

        props.posicion_id  == 1 ?
        <div className="row mb-3 border">        
            <div className="col">
                <img  className='img-thumbnail' src={props!.download_url}/>           
            </div>            
            <div className="col">                        
                <h3>{props.titulo}</h3>
                <h5>{props.subtitulo}</h5>
                <p className='lead'>{props.descripcion}</p>
            </div>         
            <AdSectionEditModal
            key={props.id} 
            id = {props.id}
            posicion_id={props.posicion_id}           
            descripcion= {props.descripcion} 
            estado= {props.estado} 
            image_url= {props.image_url}
            subtitulo= {props.subtitulo}
            titulo= {props.titulo}
            globalStateFunction2={()=> handleAux1()}
            
            />     
            <AdSectionDelete 
            id={props.id}
            globalStateFunction2={()=> handleAux2()}
            />                 
        </div>
            
        :

        <div className="row mb-3 border">        
            <div className="col">                        
                <h3>{props.titulo}</h3>
                <h5>{props.subtitulo}</h5>
                <p className='lead'>{props.descripcion}</p>
            </div>
            <div className="col">        
                <img  className='img-thumbnail' src={props!.download_url}/>
            </div>
            <AdSectionEditModal                
                key={props.id} 
                id = {props.id}
                posicion_id={props.posicion_id}           
                descripcion= {props.descripcion} 
                estado= {props.estado} 
                image_url= {props.image_url}
                subtitulo= {props.subtitulo}
                titulo= {props.titulo}
                globalStateFunction2={()=> handleAux1()}                
            />
            <AdSectionDelete id={props.id}
            globalStateFunction2={()=> handleAux2()}            
            />                                    
        </div>
    }
    </>
    )
}

