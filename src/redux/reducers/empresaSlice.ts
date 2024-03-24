
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from '../store';
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";

export type EmpresaData = {
    correo: string;
    facebookUrl: string;
    titulo_footer:string;
    subtitulo_footer: string;
    direccionCorta: string;
    telefonos: string[]
    horarios: string[]
}

type EmpresaState = {
    dataEmpresa: EmpresaData | null;
}

const initialState: EmpresaState = {
    dataEmpresa: null,
};

const empresaSlice = createSlice({
    name: 'empresa',
    initialState,
    reducers: {
        setEmpresaData(state, action: PayloadAction<EmpresaData>){
            state.dataEmpresa = action.payload;
        },        
    },
});


export const fetchEmpresaData = (): AppThunk => async dispatch => {
    try{
        const docRef = await getFirebaseDocs('Empresa');
        const docSnap = docRef[0];
        //console.log(docSnap,'docSnap')
        if(docSnap){
            const empresaData: EmpresaData = {
                //nombre: docSnap.nombre,
                correo: docSnap.correo,
                facebookUrl: docSnap.redes[0].red_url,
                titulo_footer: docSnap.titulo_principal,
                subtitulo_footer: docSnap.subtitulo_principal,
                direccionCorta: docSnap.direccion_corta,
                telefonos: [
                    docSnap.telefonos[0],
                    docSnap.telefonos[1]
                ],
                // telefonoFijo: docSnap.telefonos[0],
                // whatsapp: docSnap.telefonos[1],

                horarios: [                
                    docSnap.horarios[0],
                    docSnap.horarios[1],
                    docSnap.horarios[2],
                    docSnap.horarios[3],
                    docSnap.horarios[4],
                    docSnap.horarios[5],
                    docSnap.horarios[6]
                ]
                
            };
            //console.log(empresaData, 'empresadata')
            dispatch(setEmpresaData(empresaData));
        }
    } catch (error){
        console.error("Error al obtener los datos de la empresa:", error);
    }
};
export const empresaSelector = (state: RootState) => state.empresa.dataEmpresa
export const { setEmpresaData } = empresaSlice.actions;
export default empresaSlice.reducer;