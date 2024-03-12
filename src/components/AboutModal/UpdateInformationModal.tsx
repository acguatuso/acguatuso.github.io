import { useState,useEffect } from 'react';


export const UpdateMainSectionModal = () => {
    //to do agregar funcionalidades de backend

    return (
    <>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Actualizar Inicio
  </button>    
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header border-0">
            <h1 className="modal-title fs-5 text-black" id={`title-modal-add`} >
            Actualizar Inicio
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className='form-row text-black'>                      
            <label className='form-label' htmlFor={`title-about-add`}>Título</label>
            <textarea className='form-control rounded-0 h-10' id={`title-about-update-info`} name="title"  />
            <label className='form-label' htmlFor={`description-about-add`}>Descripción</label>
            <textarea className='form-control rounded-0 ' id={`description-about-update-info`} name='description-about' rows={10}  />        
            <label className='form-label' htmlFor={`uploadImage-add`}>Subir imagen</label>
            <input className="form-control" id={`uploadImage-add`}  name='uploadImage' type="file" onChange={ (event) => (event.target.files![0])}  />                    
          </div>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}