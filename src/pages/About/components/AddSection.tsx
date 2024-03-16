import { useState } from 'react';
import { addFirebaseDoc } from '../../../api/addFirebaseDoc/addFirebaseDoc';
import { uploadFirebaseImage } from '../../../api/uploadFirebaseImage/uploadFirebaseImage';
import { adsSection } from './about.interface';
import { v4 } from "uuid"
import { useAppDispatch } from '../../../hooks/hooks';
import { addSection } from '../../../redux/reducers/aboutSlice';
export const AddSection = () => {
  const dispatch = useAppDispatch()
  const [fileImage, setFileImage] = useState<File>()
  const [forms, setForms] = useState<adsSection>({
    id: '',
    posicion_id: 1,
    titulo: '',
    subtitulo: '',
    descripcion: '',
    estado: 1,
    image_url: ''
  })
  const handleChange = (evt: any) => {
    setForms({
        ...forms,
        [evt.target.name]: evt.target.value
      })
  }
  const handleSetFile = (evt: any) =>{
    setFileImage(evt.target.files[0])
    setForms({...forms, 
      image_url: `Empresa/Secciones/${v4()}`})
  }

  const handleAdd = async()=> {
    let res: string | undefined = ''
    if(fileImage != undefined){
      res = await uploadFirebaseImage(fileImage!,forms.image_url)
    }
    let data: adsSection = {
      posicion_id: forms.posicion_id,
      titulo: forms.titulo,
      subtitulo: forms.subtitulo,
      descripcion: forms.descripcion,
      estado: 1,
      image_url: forms.image_url,
      download_url: res
    }
    const res2 = await addFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones',data)
    console.log(res2!.id)
    
    data = {
      ...data,
      id: res2?.id
    }
    dispatch(addSection(data))

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
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleAdd()}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}