import { useRef, useState } from "react";
import './DragDrop.css'

interface ImageState {
    name: string;
    url: string;
}

export const DragDrop = () => {

    const [image, setImage] = useState<ImageState | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function selectFile() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function onFileSelect(event:any){
        const file = event.target.files[0];
        if(!file || file.type.split('/')[0] !== 'image') return;
        
        setImage({
            name: file.name,
            url: URL.createObjectURL(file),
        });
        event.target.value = ''; 
    }

    function deleteImage(){
        if (image) {
            URL.revokeObjectURL(image.url);
            setImage(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    function onDragOver(event:any){
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event:any){
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event:any){
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if(!file || file.type.split('/')[0] !== 'image') return;

        setImage({
            name: file.name,
            url: URL.createObjectURL(file),
        });
    }

    function uploadImage() {
        console.log('Image: ', image);
    }

  return (
    <div className="card">
            <div className="top">
                <p>Subir imágen</p>
            </div>
            <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className="select">
                        Suelte la imágen aquí
                    </span>

                ) : (
                    <>
                        Drag & Drop aquí o {" "}
                        <span className="select" role="button" onClick={selectFile}>
                            Adjunta la imágen
                        </span>
                    </>
                )}

                <input type="file" name="file" className="file" ref={fileInputRef} onChange={onFileSelect}></input>
            </div>
            {image && (
                <div className="container">
                    <div className="image">
                        <span className="delete" onClick={deleteImage}>&times;</span>
                        <img src={image.url} alt={image.name}/>
                    </div>
                </div>
            )}
            {image && (
                <button type='button' onClick={uploadImage}>
                    Subir
                </button>
            )}
        </div>
  )
}
