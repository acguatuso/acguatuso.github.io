import { Timestamp } from "firebase/firestore";
export interface Curso {
    id: string;
    nombre: string;
    descripcion: string;
    modalidad: string;
    fechaCreacion: Timestamp;
    fecha_inicio: Timestamp;
    fecha_finalizacion: Timestamp;
    horario: Horario[];
    link_plataforma: string;
}

export interface Horario { 
    dia: string;
    hora: string;
}