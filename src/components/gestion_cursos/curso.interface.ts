import { Timestamp } from "firebase/firestore";
export interface Curso {
    id?: string;
    nombre: string;
    descripcion: string;
    modalidad: string;
    fechaCreacion?: Timestamp;
    fecha_inicio: Timestamp;
    fecha_finalizacion: Timestamp;
    horario: Horario[];
    link_plataforma: string;
    image_url: string;
    aprobados?: [];
    reprobados?: [];
    matriculados?: [];
    postulados?: [];
    estado?: number;
    disponibilidad?: number;
    download_url: string;
}

export interface Horario { 
    dia: string;
    hora: string;
}