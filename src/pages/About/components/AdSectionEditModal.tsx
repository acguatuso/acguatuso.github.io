import { useState } from 'react'
import { adSection, sectionsData } from './about.interface';
import { updateFirebaseDoc } from '../../../api/updateFirebaseDoc/updateFirebaseDoc';
import { uploadFirebaseImage } from '../../../api/uploadFirebaseImage/uploadFirebaseImage';

export const AdSectionEditModal = (props: adSection) => {
    const [fileImage, setFileImage] = useState<File>()
    const [forms, setForms] = useState<sectionsData>({
      id: props.id,
      posicion_id: props.posicion_id,
      titulo: props.titulo,
      subtitulo: props.subtitulo,
      descripcion: props.descripcion,
      estado: props.estado,
      image_url: props.image_url
      
      //todo imagenes se debe realizar una funcion que verifique cuales nombres est[an repetido en el firestore
    })
    //console.log(props, 'adsectioneditmodal')
    const handleChange = (evt: any) => {
      //console.log(evt.target.value, forms.position_id) 
      setForms({
          ...forms,
          [evt.target.name]: evt.target.value
        })
    }
    const handleSetFile = (evt: any) =>{
        setFileImage(evt.target.files[0])
        //handleChange(evt)
      }
    const handleUpdate = async()=> {
        console.log('handleupdate')
        if(fileImage != undefined){
            await uploadFirebaseImage(fileImage!,forms.image_url)
        }
        await updateFirebaseDoc(`/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones/${forms.id}`,{
            posicion_id: forms.posicion_id,
            titulo: forms.titulo,
            subtitulo: forms.subtitulo,
            descripcion: forms.descripcion,
            estado: 1,
            image_url: forms.image_url
        })
        props.globalStateFunction2()
    }

    return (
    <>
    <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#${props.id}`}>
    Editar
    </button>     
    <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header border-0">
                    <h1 className="modal-title fs-5 text-black" id={`title-modal-${props.id}`} >
                    Editar
                    </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='form-row text-black'>                      
                    <label className='form-label' htmlFor={`title-about-addSection`}>Título</label>
                    <textarea className='form-control rounded-0 h-10' id={`title-about-${props.id}`} name="titulo" defaultValue={props.titulo} onChange={(evt) => handleChange(evt)}/>
                    <label className='form-label' htmlFor={`subtitle-about-${props.id}`}>Subtítulo</label>
                    <textarea className='form-control rounded-0 h-10' id={`subtitle-about-${props.id}`} name="subtitulo" defaultValue={props.subtitulo} onChange={(evt) => handleChange(evt)}/>
                    <label className='form-label' htmlFor={`description-about-${props.id}`}>Descripción</label>
                    <textarea className='form-control rounded-0 ' id={`description-about-${props.id}`} name='descripcion' defaultValue={props.descripcion}  rows={10}  onChange={(evt) => handleChange(evt)}/>        
                    <label className='form-label' htmlFor={`uploadImage-${props.id}`}>Subir imagen</label>
                    <input className="form-control mb-3" id={`uploadImage-${props.id}`}  name='image_url' type="file" onChange={(evt)=>handleSetFile(evt)}/>    
                    {/* <div className="form-check mb-1" >
                        <input className="form-check-input" type="radio" name="position" id="position1" onChange={() => setForms({...forms, posicion_id: 1})}/>
                        <label className="form-check-label" htmlFor="position1">
                            Imagen a la derecha
                        </label>
                    </div>
                    <div className="form-check mb-1">
                        <input className="form-check-input" type="radio" name="position" id="position2" onChange={() => setForms({...forms, posicion_id: 2})} />
                        <label className="form-check-label" htmlFor="position2">
                            Imagen a la izquierda
                        </label>

                    </div> */}
                    <div className="btn-group" data-toggle="buttons">
                        <label className="btn btn-secondary">
                        
                            <input type="radio" name="options" id="option1" autoComplete="off" onClick={() => setForms({...forms, posicion_id: 1})}/> Izquierda
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" id="option2" autoComplete="off"  onClick={() => setForms({...forms, posicion_id: 2})}/> Derecha
                        </label>
                    </div>

                        {/* <button type="button" className="btn btn-lg btn-primary" disabled>Primary button</button>
                        <button type="button" className="btn btn-secondary btn-lg" disabled>Button</button> */}
                </div>

            </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleUpdate()}>Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
