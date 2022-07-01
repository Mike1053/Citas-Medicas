import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fotoLoading } from '../../actions/uploadImage';
import { fetchSinToken, fetchConToken } from '../../helpers/fetch';

const MostrarFoto = () => {

    const [foto, setFoto] = useState();
    useEffect(() => {
      const fetchData = async () => {
        const data = await fotoLoading();
        setFoto(data)
      }
      fetchData()
    }, [])
    
  return (
    <div>Aqui va la foto:
      <div>
      <img 
					className="img-fluid mt-2"
					src={foto   /*user?.profilePic*/}
				/>
      </div>
    </div>
    
  )
}

export default MostrarFoto