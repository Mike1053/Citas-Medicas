import React, { useState, useEffect } from 'react';
import { taskClearActivetask } from '../../actions/task';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImage, updateImage } from '../../actions/uploadImage';
import { toast } from 'react-toastify'
import { fotoLoading } from '../../actions/uploadImage';
import './ImageModal.css';

import moment from 'moment';
import Modal from 'react-modal';

import { uiCloseModal } from '../../actions/ui';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : '#105469'
  }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  description: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}

const ImageModal = () => {

    const [foto, setFoto] = useState();
    const [wasFoto, setWasFoto] = useState();

    useEffect(() => {
      const fetchData = async () => {
        const data = await fotoLoading();
        let base = data.map(function(element){
          setFoto(element.foto)
          setWasFoto(data)
          setSelectedFile(element)
      })
      }
      fetchData()
    }, [])
    
    const { modalOpen } = useSelector( state => state.ui );
    const { activeTask } = useSelector( state => state.task );
    const dispatch = useDispatch();

    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
        dispatch( taskClearActivetask() );
    }

    const [fileName, setFileName] = useState("Subir una imagen")
	const [selectedFile, setSelectedFile] = useState(null)
	const { uid } = useSelector( state => state.auth );

	const handleFileChange = (e) => {
		const [file] = e.target.files; 
		//const SIZE_50MB = 50 * 1024 * 1024;
		//const isValidSize = file.size < SIZE_50MB; 
		// const isValidSize = file.size < 200 * 1024
		//const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
		//const isValidType = isNameOfOneImageRegEx.test(file.name)
		
		//if(!isValidSize) return toast.error("Imagen muy pesada, máximo 50MB")
		//if(!isValidType) return toast.error("Sólo puedes subir imágenes")
		
		setFileName(file.name);
		
		const reader = new FileReader();
		reader.onloadend = () => {
			setFoto(reader.result)
		}
		reader.readAsDataURL(file)

	}
	
	const handleUpdloadProfilePic = (e) => {
		e.preventDefault();
        if(wasFoto){
            console.log("existe foto")
            selectedFile.foto = foto;
            dispatch( updateImage( selectedFile ) );
        }else{
            console.log("no existe imagen")
            dispatch( uploadImage( foto,  uid) ); 
        }
	}

	const deleteImage = () =>{
		setFoto(null);
	}

  return (
    <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
            <div className='modal-div'>
                <div class="text-center" closeButton>
                    <h1>Cambiar mi foto de perfil</h1>
                </div>
                <div class="text-center">
                    <img 
                        className="rounded-circle mt-2" 
                        src={foto   /*user?.profilePic*/}
                    />
                </div>
                {/*Esta madre es subir la imagen*/}
                
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
                </div>
                <div>
                    <button variant="secondary" onClick={deleteImage}>
                        Cancelar 
                    </button>
                    <button variant="primary" onClick={handleUpdloadProfilePic}>
                        Subir imagen
                    </button>
                </div>
            </div>
        </Modal>
  )
}

export default ImageModal