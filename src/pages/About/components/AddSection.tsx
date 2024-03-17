import { useState } from 'react';
import { addFirebaseDoc } from '../../../api/addFirebaseDoc/addFirebaseDoc';
import { uploadFirebaseImage } from '../../../api/uploadFirebaseImages/uploadFirebaseImages';
import { sectionsData } from './about.interface';

//se pasan funciones medainte props en react el modal se puede convertir en un ui
export const AddSection = (image_url_list: string[]) => {
    //to do agregar funcionalidades de backend
  const [fileImage, setFileImage] = useState<File>()
  const [forms, setForms] = useState<sectionsData>({
    id: '',
    posicion_id: 1,
    titulo: '',
    subtitulo: '',
    descripcion: '',
    estado: 1,
    image_url: `/Empresa/Secciones/`
    //todo imagenes se debe realizar una funcion que verifique cuales nombres est[an repetido en el firestore
  })
  const handleChange = (evt: any) => {
    //console.log(evt.target.value, forms.position_id) 
    setForms({
        ...forms,
        [evt.target.name]: evt.target.value
      })
  }
  const handleSetFile = (evt: any) =>{
    setFileImage(evt.target.files[0])
    handleChange(evt)
  }

  const handleUpdate = async()=> {
    let counter = 1
    let simplifiedPath;
    if(!(forms.image_url in image_url_list)){
      simplifiedPath = forms.image_url.slice(12)
    }
    while (forms.image_url in image_url_list){
      setForms({
        ...forms,
        image_url: `Empresa/Secciones/image(${counter})`
      })
      counter++
      simplifiedPath = forms.image_url
    }              
    //console.log(forms.image_url.slice(12),'handleupdate' )
    await addFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones',{
      posicion_id: forms.posicion_id,
      titulo: forms.titulo,
      subtitulo: forms.subtitulo,
      descripcion: forms.descripcion,
      estado: 1,
      image_url: `/Empresa/Secciones/${simplifiedPath}`
    })
    await uploadFirebaseImage(fileImage!,`Empresa/Secciones/${simplifiedPath}`)
  }
    return (
    <>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-section">
    Crear Sección
  </button>    
  <div className="modal fade" id="add-section" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header border-0">
            <h1 className="modal-title fs-5 text-black" id='title-modal-addSection' >
            Crear Sección
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className='form-row text-black'>                      
            <label className='form-label' htmlFor={`title-about-addSection`}>Título</label>
            <textarea className='form-control rounded-0 h-10' id={`title-about-addSection`} name="titulo" defaultValue={forms.titulo} onChange={(evt) => handleChange(evt)}></textarea>
            <label className='form-label' htmlFor={`subtitle-about-addSection`}>Subtítulo</label>
            <textarea className='form-control rounded-0 h-10' id={`subtitle-about-addSection`} name="subtitulo"   defaultValue={forms.subtitulo} onChange={(evt) => handleChange(evt)}/>
            <label className='form-label' htmlFor={`description-about-addSection`}>Descripción</label>
            <textarea className='form-control rounded-0 ' id={`description-about-addSection`} name='descripcion' rows={10}  defaultValue={forms.descripcion} onChange={(evt) => handleChange(evt)}/>        
            <label className='form-label' htmlFor={`uploadImage-addSection`}>Subir imagen</label>
            <input className="form-control mb-3" id={`uploadImage-addSection`}  name='image_url' type="file"   onChange={(evt) => handleSetFile(evt)}/>    
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
          </div>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
          <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleUpdate()}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}