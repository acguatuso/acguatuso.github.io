import { Timestamp } from "firebase/firestore";
export interface Curso {
    id: string;
    nombre: string;
    descripcion: string;
    modalidad: string;
    fecha_inicio: Timestamp;
    fecha_finalizacion: Timestamp;
    horario: string;
    link_plataforma: string;
}