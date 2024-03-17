
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { getFirebaseDoc } from "../../api/getFirebaseDoc/getFirebaseDoc";
interface EmpresaData {
    correo: string;
    facebookUrl: string;
    nombre:string;
    tituloPrincipal:string;
    subtituloPrincipal: string;
    telefonoFijo: string;
    whatsapp: string;
    direccionCorta: string;
    horarioLunes: string;
    horarioMartes: string;
    horarioMiercoles: string;
    horarioJueves: string;
    horarioViernes: string;
    horarioSabado: string;
    horarioDomingo: string;
}

interface EmpresaState {
    data: EmpresaData | null;
}

const initialState: EmpresaState = {
    data: null,
};

const empresaSlice = createSlice({
    name: 'empresa',
    initialState,
    reducers: {
        setEmpresaData(state, action: PayloadAction<EmpresaData>){
            state.data = action.payload;
        },
    },
});

export const { setEmpresaData } = empresaSlice.actions;
export default empresaSlice.reducer;


export const fetchEmpresaData = (): AppThunk => async dispatch => {
    try{
        const docSnap = await getFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv');
        if(docSnap){
            const empresaData: EmpresaData = {
                correo: docSnap.correo,
                facebookUrl: docSnap.redes[0].red_url,
                nombre: docSnap.nombre,
                tituloPrincipal: docSnap.titulo_principal,
                subtituloPrincipal: docSnap.subtitulo_principal,
                telefonoFijo: docSnap.telefonos[0],
                whatsapp: docSnap.telefonos[1],
                direccionCorta: docSnap.direccion_corta,
                horarioLunes: docSnap.horarios[0],
                horarioMartes: docSnap.horarios[1],
                horarioMiercoles: docSnap.horarios[2],
                horarioJueves: docSnap.horarios[3],
                horarioViernes: docSnap.horarios[4],
                horarioSabado: docSnap.horarios[5],
                horarioDomingo: docSnap.horarios[6],

            };
            dispatch(setEmpresaData(empresaData));
        }
    } catch (error){
        console.error("Error al obtener los datos de la empresa:", error);
    }
};