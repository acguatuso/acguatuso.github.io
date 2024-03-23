
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from '../store';
//import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { getFirebaseDoc } from "../../api/getFirebaseDoc/getFirebaseDoc";

export interface EmpresaData {
    //nombre: string,
    correo: string;
    facebookUrl: string;
    titulo_footer:string;
    subtitulo_footer: string;
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

export const empresaSelector = (state: RootState) => state.empresa.data
export const { setEmpresaData } = empresaSlice.actions;
export default empresaSlice.reducer;


export const fetchEmpresaData = (): AppThunk => async dispatch => {
    try{
        const docSnap = await getFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv');
        if(docSnap){
            const empresaData: EmpresaData = {
                //nombre: docSnap.nombre,
                correo: docSnap.correo,
                facebookUrl: docSnap.redes[0].red_url,
                titulo_footer: docSnap.titulo_principal,
                subtitulo_footer: docSnap.subtitulo_principal,
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