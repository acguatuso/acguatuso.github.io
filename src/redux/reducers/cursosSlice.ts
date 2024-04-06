import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from '../store';
import { Curso } from "../../components/gestion_cursos/curso.interface";
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { idDelete } from "../../pages/About/about.interface";

export interface CursoState {
    loading: boolean;
    cursos: Array<Curso>;
    error: string | undefined;
}

const initialState: CursoState = {
    loading: false,
    cursos: [],
    error: undefined,
}

export const fetchCursos = createAsyncThunk(
    "users/fetchCursos",
    async () => {
        const docSnap = await getFirebaseDocs("Cursos")
        const data = docSnap as Curso[]
        /* console.log(data) */
         // Filtrar los cursos que tienen una fecha de creación definida
        const cursosConFechaCreacion = data.filter(curso => curso.fechaCreacion !== undefined);

        // Ordenar los cursos por fecha de creación descendente
        const cursosOrdenados = cursosConFechaCreacion.sort((a, b) => {
          return b.fechaCreacion!.toMillis() - a.fechaCreacion!.toMillis();
        });

        return cursosOrdenados;
        }
)

const cursosSlice = createSlice({
    name: 'cursos',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchCursos.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchCursos.fulfilled, (state, action: PayloadAction<Array<Curso>>) => {
        state.loading = false;
        state.cursos = action.payload;
      });
      builder.addCase(fetchCursos.rejected, (state, action) => {
        state.loading = false;
        state.cursos = [];
        state.error = action.error.message;
      });
    },
    reducers: {
      addCurso: (state, action: PayloadAction<Curso>) => {
        state.cursos.unshift(action.payload);
      },
      editCurso(state, action: PayloadAction<Curso>) {
        const newData = state.cursos.map((element: Curso) => {
            if (element.id === action.payload.id) {
                return {
                    ...action.payload,
                    fechaCreacion: element.fechaCreacion 
                };
            }
            return element;
        });
        state.cursos = newData;
    },
      deleteCurso(state, action: PayloadAction<idDelete>){
        const data = state.cursos.filter((element)=> { 
            console.log(element.id,action.payload.id,'deletecurso')
            return element.id != action.payload.id })
        //console.log(action.payload.id,'deletesection')
        state.cursos = data
      },
      changeCursoEstado: (state, action: PayloadAction<string>) => {
        const cursoId = action.payload;
        const curso = state.cursos.find(curso => curso.id === cursoId);
        if (curso) {
          curso.estado = curso.estado === 0 ? 1 : 0;
        }
      },
      changeCursoDisponibilidad: (state, action: PayloadAction<string>) => {
        const cursoId = action.payload;
        const curso = state.cursos.find(curso => curso.id === cursoId);
        if (curso) {
          curso.disponibilidad = curso.disponibilidad === 0 ? 1 : 0;
        }
      },
    }
  })

  export const { addCurso, deleteCurso, editCurso, changeCursoEstado, changeCursoDisponibilidad } = cursosSlice.actions;
  export const cursosSelector = (state: RootState) => state.cursos;
  export default cursosSlice.reducer;
  