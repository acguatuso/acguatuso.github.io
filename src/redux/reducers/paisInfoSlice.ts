// Importar createSlice y otros tipos necesarios
import { createSlice } from '@reduxjs/toolkit';

// Definir las interfaces para distrito, cantón y provincia
interface Distrito {
    nombre: string;
}

interface Canton {
    nombre: string;
    distritos: Distrito[];
}

interface Provincia {
    nombre: string;
    cantones: {
        [nombre: string]: Canton; // Los cantones se indexan por su nombre
    };
}

// Definir el tipo para el JSON
type PaisInformacion = {
    [provincia:string]: Provincia;   
};

// Definir el estado inicial
type InitialState = {
    data: PaisInformacion | null;
    loading: boolean;
    error: string | null | any;
};

// Estado inicial
const initialState: InitialState = {
    data: null,
    loading: false,
    error: null,
};

// Definir el slice para Pais_Info
const paisInfo = createSlice({
    name: 'paisInfo',
    initialState,
    reducers: {
        // Acción para iniciar la carga de la información
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        // Acción para manejar la carga exitosa de la información
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
        },
        // Acción para manejar los errores durante la carga de la información
        fetchDataFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Exportar reducer y acciones del slice
export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = paisInfo.actions;
export default paisInfo.reducer;


// Definir la función para obtener la información del país de forma asíncrona
export const fetchPaisInfoAsync = () => async (dispatch: any) => {
    dispatch(paisInfo.actions.fetchDataStart());
    try {
        const response = await fetch('https://gist.githubusercontent.com/josuenoel/80daca657b71bc1cfd95a4e27d547abe/raw');
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        const data: PaisInformacion = await response.json();
        // Adaptar los datos para permitir el acceso por nombre
        const newData: PaisInformacion = {} ;
        Object.values(data.provincias).forEach((provincia) => {
            //console.log(provincia)
            const cantonesByName: { [nombre: string]: Canton } = {};
            Object.values(provincia.cantones).forEach((canton) => {
                cantonesByName[canton.nombre] = canton;
            });
            newData[provincia.nombre] = {
                ...provincia,
                cantones: cantonesByName,
            };
        });
        dispatch(paisInfo.actions.fetchDataSuccess(newData));
    } catch (error) {
        console.error('Ocurrió un error al obtener el JSON:', error);
        dispatch(paisInfo.actions.fetchDataFailure(error.message! || 'Ha ocurrido un error'));
    }
};

// Función para obtener los nombres de las provincias
export function obtenerNombresProvincias(paisInfo: PaisInformacion): string[] {
    return Object.keys(paisInfo);
}

// Función para obtener los cantones de una provincia seleccionada
export function obtenerNombresCantonesDeProvincia(provincia: string, paisInfo: PaisInformacion): string[] {
    if (!paisInfo || !paisInfo[provincia] || !paisInfo[provincia].cantones) {
        return []; // o puedes manejar esto según sea necesario en tu aplicación
    }
    const provinciaSeleccionada = paisInfo[provincia];
    return Object.keys(provinciaSeleccionada.cantones);
}

// Función para obtener los nombres de los distritos de un cantón seleccionado
export function obtenerNombresDistritosDeCanton(canton: string, provincia: string, paisInfo: PaisInformacion): string[] {
    const provinciaSeleccionada = paisInfo[provincia];
    const cantonSeleccionado = provinciaSeleccionada.cantones[canton];

    // Extraer los nombres de los distritos del objeto JSON
    const nombresDistritos: string[] = [];
    for (const key in cantonSeleccionado.distritos) {
        if (Object.prototype.hasOwnProperty.call(cantonSeleccionado.distritos, key)) {
            nombresDistritos.push(cantonSeleccionado.distritos[key]);
        }
    }

    return nombresDistritos;
}

