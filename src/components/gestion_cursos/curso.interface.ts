import { Timestamp } from "firebase/firestore";
export interface Curso {
  id?: string;
  nombre: string;
  descripcion: string;
  modalidad: number;
  fechaCreacion?: Timestamp;
  fecha_inicio: Timestamp;
  fecha_finalizacion: Timestamp;
  horario: Horario[];
  link_plataforma: string;
  image_url: string;

  aprobados: any[];
  reprobados: any[];
  matriculados: any[];
  postulados: any[];

  estado?: number;
  visible?: number;
  download_url: string;
  [key: string]: string | number | Timestamp | Horario[] |undefined;
}

export interface Horario {
  dia: string;
  hora: string;
}
