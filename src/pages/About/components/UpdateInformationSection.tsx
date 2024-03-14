// import { useState } from "react"

// export const InformationSection = () => {
//   const [forms, setForms] = useState({

//   })
//   return (
//     <>
//     <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="information-section-edit">
//     Editar Información
//     </button>

//     <div className="modal fade" id="information-section-edit" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
//     <div className="modal-dialog">
//         <div className="modal-content">
//         <div className="modal-header">
//             <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Información</h1>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div className="modal-body">
//           <div className='form-row text-black'>                      
//             <label className='form-label' htmlFor={`title-about-add`}>Título</label>
//             <textarea className='form-control rounded-0' id={`title-about-add`} name="titulo"   value={forms.titulo}  onChange={(evt)=> handleChange(evt)}/>
//             <label className='form-label' htmlFor={`subtitle-about-add`}>Subtitulo</label>
//             <textarea className='form-control rounded-0 ' id={`subtitle-about-add`} name='subtitulo' value={forms.subtitulo} onChange={(evt) => handleChange(evt)} />        
//             <label className='form-label' htmlFor={`uploadImage-add`}>Subir imagen</label>
//             <input className="form-control" id={`uploadImage-add`}  name='image_url' type="file" onChange={(evt)=> handleSetFile(evt)}/>                    
//           </div>


//         </div>
//         <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
//             <button type="button" className="btn btn-primary" data-bs-dismiss='modal' >Guardar Cambios</button>
//         </div>
//         </div>
//     </div>
//     </div>     
//     </>
//   )
// }
