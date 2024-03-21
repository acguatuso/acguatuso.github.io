import { useState, ChangeEvent, FormEvent } from 'react';
import { DragDrop } from '../../components/drag-drop_image/DragDrop';


export const HomePageEdit = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'titulo') {
            setTitulo(value);
        } else if (name === 'descripcion') {
            setDescripcion(value);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        //
        //firebase
        //
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        //
        //
        //
    };

    return (
        <>
            <h1>Homepage</h1>
            <div className="container mt-5">
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="titulo">Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                name="titulo"
                                value={titulo}
                                onChange={handleInputChange}
                                placeholder="Agrega un título"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                                className="form-control"
                                id="descripcion"
                                value={descripcion}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Agrega una descripción"
                            ></textarea>
                        </div>
                    </div>
                    
                    
                    
                    <div className="col-md-6 d-flex flex-column justify-content-between">
                        <DragDrop />
                        
                        {/* <div className='form-group'>
                            <label htmlFor="imagen">Insertar Imagen</label>
                            <input type="file" className='form-control-file' id='imagen' name='imagen' onChange={handleImageChange} />
                        </div>
                        <div className="btn-group mt-md-3">
                            <button type="submit" className="btn btn-primary">Aplicar</button>
                            <button type="button" className="btn btn-secondary">Guardar cambios</button>
                        </div> */}
                    </div>
                </form>
            </div>
        </>
    );
};
