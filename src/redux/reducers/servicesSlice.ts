import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { adsSection, updateMainSection, idDelete } from '../../pages/About/about.interface';
import { getFirebaseDoc } from '../../api/getFirebaseDoc/getFirebaseDoc';
import { getFirebaseDocs } from '../../api/getFirebaseDocs/getFirebaseDocs';


//thunks
export const fetchMainServices = createAsyncThunk(
    'ads/fetchMainService',
    async () => {
        
        const docSnap = await getFirebaseDoc('/Avisos/1x9cYIlY1FaQcw9jZhf6')
        console.log(docSnap, 'fetchMainService')

    }
)