
export const UsuariosMatriculadosPage = ({ onRegresarClick, /* idCurso, nombreCurso, usuariosInteresados, matriculados */ }:
    {onRegresarClick: () => void; /* idCurso: string; nombreCurso: string; usuariosInteresados: string[]; matriculados: string[]*/ }) => {
  
    
    const handleClickRegresar = () => {
        onRegresarClick(); // aqui estoy llamando a la funcion del componente ListaCursosAprobacionesPage para que cambie el estado de showListaUsuarios a false. Y asi se vuelva a mostrar la lista de los cursos matriculados
    }
    
    return (
        <div>
            <h1>Usuarios matriculados en el curso de: .....</h1>
            <button
                    className="btn btn-primary"
                    onClick={handleClickRegresar}>
                    Regresar
            </button>
        </div>
  )
}
