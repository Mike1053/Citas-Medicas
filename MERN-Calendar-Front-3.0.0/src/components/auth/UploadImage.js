import { useState } from 'react';
import { toast } from 'react-toastify'

import React from 'react'

	export const UploadImage = ({ isOpen, close }) => {
    const [fileName, setFileName] = useState("Subir una imagen")
	const [selectedFile, setSelectedFile] = useState(null)

	const handleFileChange = (e) => {
		const [file] = e.target.files; 
		const SIZE_50MB = 50 * 1024 * 1024;
		const isValidSize = file.size < SIZE_50MB; 
		// const isValidSize = file.size < 200 * 1024
		const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
		const isValidType = isNameOfOneImageRegEx.test(file.name)
		
		//if(!isValidSize) return toast.error("Imagen muy pesada, máximo 50MB")
		//if(!isValidType) return toast.error("Sólo puedes subir imágenes")
		
		setFileName(file.name);
		
		const reader = new FileReader();
		reader.onloadend = () => {
			console.log(reader.result);
			setSelectedFile(reader.result)
		}
		reader.readAsDataURL(file)

	}
	
	const handleUpdateProfilePic = () => {
		if(!selectedFile) return toast.error('Debes seleccionar una nueva imagen');
		//updateUser({ profilePic: selectedFile })
		close()
	}

	return (
		<div>
			<div closeButton>
				<h1>Cambiar mi foto de perfil</h1>
			</div>
			<div>
				<form>
					<input type={"file"} 
						custom
						label={fileName}
						data-browse="Subir"
						onChange={handleFileChange}
						accept=".jpg, .jpeg, .gif, .png"
					/>
				</form>

				<img 
					className="img-fluid mt-2"
					src={selectedFile   /*user?.profilePic*/}
					alt="profile-previw"
				/>
			</div>
			<div>
				<button variant="secondary" onClick={close}>
					Cancelar
				</button>
				<button variant="primary" onClick={handleUpdateProfilePic}>
					Actualizar imagen
				</button>
			</div>
		</div>
	);
}

export default UploadImage