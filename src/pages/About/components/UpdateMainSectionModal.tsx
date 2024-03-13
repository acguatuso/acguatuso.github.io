import { useState,useEffect } from 'react';
import { headData } from './about.interface';
import { updateFirebaseDoc } from '../../../api/updateFirebaseDoc/updateFirebaseDoc';
import { uploadFirebaseImage } from '../../../api/uploadFirebaseImages/uploadFirebaseImages';


export const UpdateMainSectionModal = (head: headData) => {
    //to do agregar funcionalidades de backend
  const [forms, setForms] = useState({
    titulo: '',
    subtitulo: '',
    image_url: ''
  })

  const [state, setState] = useState(false)
  const [imageUpload, setImageUpload] = useState<File>()
  const handleChange = (evt: any) => {
    //console.log(forms.titulo,forms.subtitulo)
    setForms({
      ...forms,
      [evt.target.name]: evt.target.value
    })
  }
  const handlePrevious = () => {
    setForms({
      titulo: head.titulo_principal as string,
      subtitulo: head.subtitulo_principal as string,
      image_url: head.image_principal_url as string
    })
  }
  const handleSetFile = (evt: any) =>{
    setImageUpload(evt.target.files[0])
    handleChange(evt)
  }
  useEffect(() => {
    (async () => {
      if(state){
      await updateFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv',{
        titulo_principal: forms.titulo,
        subtitulo_principal: forms.subtitulo,
        image_url: `/Empresa/Principal/imagen_principal`      
      })
      await uploadFirebaseImage(imageUpload!,'/Empresa/Principal/imagen_principal')
      setState(false)
      //window.location.reload()
    }            
    })()
    
  }, [state])
  
    return (
    <>
    <div id='main-text-setting' className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
      style={{
        backgroundImage: `${head.download_url}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <img src={head.download_url}/>
      <h1 className="mb-2 ">{head.titulo_principal}</h1>
      <p className="lead">
        {head.subtitulo_principal}
      </p>
      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=> handlePrevious()}>
      Actualizar Inicio
      </button>    
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border-0">
                <h1 className="modal-title fs-5 text-black" id={`title-modal-add`} >
                Actualizar Inicio          
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handlePrevious()}></button>
            </div>
            <div className="modal-body">
              <div className='form-row text-black'>                      
                <label className='form-label' htmlFor={`title-about-add`}>Título</label>
                <textarea className='form-control rounded-0 h-10' id={`title-about-add`} name="titulo"   value={forms.titulo}  onChange={(evt)=> handleChange(evt)}/>
                <label className='form-label' htmlFor={`subtitle-about-add`}>Subtitulo</label>
                <textarea className='form-control rounded-0 ' id={`subtitle-about-add`} name='subtitulo' value={forms.subtitulo} onChange={(evt) => handleChange(evt)} />        
                <label className='form-label' htmlFor={`uploadImage-add`}>Subir imagen</label>
                <input className="form-control" id={`uploadImage-add`}  name='image_url' type="file" onChange={(evt)=> handleSetFile(evt)}/>                    
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> handlePrevious() }>Cancelar</button>
              <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={()=>setState(true)}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>

    </div>  

    </>
  )
}
