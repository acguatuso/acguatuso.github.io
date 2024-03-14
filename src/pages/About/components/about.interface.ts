




export interface sectionsData {
  id: string
  posicion_id: number
  descripcion: string,
  estado: number,
  image_url: string,
  subtitulo: string,
  titulo: string
  download_url?: string
}

export interface headData{
  image_principal_url: string,
  subtitulo_principal: string,
  titulo_principal: string
  download_url?: string;
}  

export interface information{
  telefonos: number,
  correo: string,
  horarios: string[]
  direccion: string
}
  
export interface idDelete{
  id: string
  globalStateFunction2(): void  
}

export interface updateMainSection{
  image_principal_url: string,
  subtitulo_principal: string,
  titulo_principal: string
  download_url?: string;
  globalStateFunction1(): void
}

export interface adSection{
  id: string
  posicion_id: number
  descripcion: string,
  estado: number,
  image_url: string,
  subtitulo: string,
  titulo: string
  download_url?: string
  globalStateFunction2(): void
}

export interface addSection{
  globalStateFunction2(): void
}

export interface imageList{
  id: string
  image_url: string
  download_url: string
}