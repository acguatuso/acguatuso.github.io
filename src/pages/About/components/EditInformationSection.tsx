import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setEmpresaData, fetchEmpresaData, EmpresaData, empresaSelector } from '../../../redux/reducers/empresaSlice';
import { updateFirebaseDoc } from "../../../api/updateFirebaseDoc/updateFirebaseDoc";

export const EditInformationSection = () => {
    const empresa = useAppSelector(empresaSelector)
    //console.log(empresa)
    const dispatch = useAppDispatch()
    const [forms, setForms] = useState({
        correo: '',
        facebook: '',
        titulo: '',
        subtitulo: '',
        telefono: '',
        whatsapp: '',
        direccionCorta: '',
        horarioLunes: '',
        horarioMartes: '',
        horarioMiercoles: '',
        horarioJueves: '',
        horarioViernes: '',
        horarioSabado: '',
        horarioDomingo: '',
  })
  useEffect(() => {
    setForms({
        correo: empresa!.correo,
        facebook: empresa!.facebookUrl,
        titulo: empresa!.titulo_footer,
        subtitulo: empresa!.subtitulo_footer,
        telefono: empresa!.telefonoFijo,
        whatsapp: empresa!.whatsapp,
        direccionCorta: empresa!.direccionCorta,
        horarioLunes: empresa!.horarioLunes,
        horarioMartes: empresa!.horarioMartes,
        horarioMiercoles: empresa!.horarioMiercoles,
        horarioJueves: empresa!.horarioJueves,
        horarioViernes: empresa!.horarioViernes,
        horarioSabado: empresa!.horarioSabado,
        horarioDomingo: empresa!.horarioDomingo,
    })
  }, [empresa])
  
  const handleSet = (evt: any) => {
    setForms(
        {
        ...forms,
        [evt.target.name] : evt.target.value
        }

    )
  }

  const handleUpdate = async () => {
    const data: EmpresaData = {
        correo: forms.correo,
        facebookUrl: forms.facebook,
        titulo_footer:forms.titulo,
        subtitulo_footer: forms.subtitulo,
        telefonoFijo: forms.telefono,
        whatsapp: forms.whatsapp,
        direccionCorta: forms.direccionCorta,
        horarioLunes: forms.horarioLunes,
        horarioMartes: forms.horarioMartes,
        horarioMiercoles: forms.horarioMiercoles,
        horarioJueves: forms.horarioJueves,
        horarioViernes: forms.horarioViernes,
        horarioSabado: forms.horarioSabado,
        horarioDomingo: forms.horarioDomingo
    }
    console.log(data, 'handleUpdateInformation')
    await updateFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv',data)
    dispatch(setEmpresaData(data))
  }
  return (
    <>
    <button type="button" className="btn btn-dark m-5" data-bs-toggle="modal" data-bs-target="#information-section-edit">
    Editar Información
    </button>

    <div className="modal fade" id="information-section-edit" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Información</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Información
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default1">Correo</span>
                                <input type="text" className="form-control" name="correo" aria-label="correo" value={forms.correo} aria-describedby="inputGroup-sizing-default1"  onChange={(evt)=> handleSet(evt)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default2">Facebook</span>
                                <input type="text" className="form-control" name="facebook" aria-label="facebook" value={forms.facebook} aria-describedby="inputGroup-sizing-default2" onChange={(evt)=> handleSet(evt)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default3">Título</span>
                                <input type="text" className="form-control" name="titulo" aria-label="titulo" value={forms.titulo} aria-describedby="inputGroup-sizing-default3" onChange={(evt)=> handleSet(evt)}/>
                            </div>            
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default4">Subtitulo</span>
                                <input type="text" className="form-control" name="subtitulo" aria-label="subtitulo" value={forms.subtitulo} aria-describedby="inputGroup-sizing-default4" onChange={(evt)=> handleSet(evt)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default5">Teléfono</span>
                                <input type="text" className="form-control" name="telefono" aria-label="telefono" value={forms.telefono} aria-describedby="inputGroup-sizing-default5" onChange={(evt)=> handleSet(evt)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default6">Whatsapp</span>
                                <input type="text" className="form-control" name="whatsapp" aria-label="whatsapp" value={forms.whatsapp} aria-describedby="inputGroup-sizing-default6" onChange={(evt)=> handleSet(evt)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default7">Dirección</span>
                                <input type="text" className="form-control" name="direccion" aria-label="direccion" value={forms.direccionCorta} aria-describedby="inputGroup-sizing-default7" onChange={(evt)=> handleSet(evt)}/>
                            </div>                           
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Horarios
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default8">Lunes</span>
                                <input type="text" className="form-control" name="horarioLunes" value={forms.horarioLunes} aria-label="horarioLunes" aria-describedby="inputGroup-sizing-default8" onChange={(evt)=> handleSet(evt)}/>
                            </div>  
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default8">Martes</span>
                                <input type="text" className="form-control" name="horarioMartes" value={forms.horarioMartes} aria-label="horarioMartes" aria-describedby="inputGroup-sizing-default8" onChange={(evt)=> handleSet(evt)}/>
                            </div>  
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default8">Miércoles</span>
                                <input type="text" className="form-control" name="horarioMiercoles" value={forms.horarioMiercoles} aria-label="horarioMiercoles" aria-describedby="inputGroup-sizing-default8" onChange={(evt)=> handleSet(evt)}/>
                            </div>  
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default8">Jueves</span>
                                <input type="text" className="form-control" name="horarioJueves" value={forms.horarioJueves} aria-label="horarioJueves" aria-describedby="inputGroup-sizing-default8" onChange={(evt)=> handleSet(evt)}/>
                            </div>                                                          
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default8">Viernes</span>
                                <input type="text" className="form-control" name="horarioViernes" value={forms.horarioViernes} aria-label="horarioViernes" aria-describedby="inputGroup-sizing-default8" onChange={(evt)=> handleSet(evt)}/>
                            </div>  
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default8">Sábado</span>
                                <input type="text" className="form-control" name="horarioSabado" value={forms.horarioSabado} aria-label="horarioSabado" aria-describedby="inputGroup-sizing-default8" onChange={(evt)=> handleSet(evt)}/>
                            </div>  
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default8">Domingo</span>
                                <input type="text" className="form-control" name="horarioDomingo" value={forms.horarioDomingo} aria-label="horarioDomingo" aria-describedby="inputGroup-sizing-default8" onChange={(evt)=> handleSet(evt)}/>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>                                                               
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={()=> handleUpdate()} >Guardar Cambios</button>
        </div>
        </div>
    </div>
    </div>     
    </>
  )
}
