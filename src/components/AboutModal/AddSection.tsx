import { useState,useEffect } from 'react';
import { Action } from '@reduxjs/toolkit';
import { sectionsData } from '../../pages/About/About';

//se pasan funciones medainte props en react el modal se puede convertir en un ui
export const AddSection = (image_url_list: string[]) => {
    //to do agregar funcionalidades de backend
  const [forms, setForms] = useState<sectionsData>({
    position_id: 1,
    titulo: '',
    subtitulo: '',
    descripcion: '',
    estado: 1,
    image_url: `AboutImage/`
    //todo imagenes se debe realizar una funcion que verifique cuales nombres est[an repetido en el firestore
  })
  const handleChange = (evt: any) => {
      setForms({
        ...forms,
        [evt.target.name]: evt.target.value
      }

      )
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
            <textarea className='form-control rounded-0 h-10' id={`title-about-addSection`} name="titulo"   value={forms.titulo} />
            <label className='form-label' htmlFor={`subtitle-about-addSection`}>Título</label>
            <textarea className='form-control rounded-0 h-10' id={`subtitle-about-addSection`} name="subtitulo"   value={forms.subtitulo} />
            <label className='form-label' htmlFor={`description-about-addSection`}>Descripción</label>
            <textarea className='form-control rounded-0 ' id={`description-about-addSection`} name='descripcion' rows={10} value={forms.descripcion} />        
            <label className='form-label' htmlFor={`uploadImage-addSection`}>Subir imagen</label>
            <input className="form-control mb-3" id={`uploadImage-addSection`}  name='image_url' type="file"   onChange={(evt) => handleChange(evt.target.value)}/>    
            <div className="form-check mb-1" >
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Imagen a la derecha
              </label>
            </div>
            <div className="form-check mb-1">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Imagen a la izquierda
              </label>
            </div>
          </div>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-primary">Guardar Cambios</button>
        {/* checkbox para elegir el lado donde se va a colocar la imagen */}
        </div>
      </div>
    </div>
  </div>

    </>
  )
}