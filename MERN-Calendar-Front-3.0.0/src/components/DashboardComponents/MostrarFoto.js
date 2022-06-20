import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fotoLoading } from '../../actions/uploadImage';
import { fetchSinToken, fetchConToken } from '../../helpers/fetch';

const MostrarFoto = () => {

    const [foto, setFoto] = useState();
    const { uid } = useSelector( state => state.auth );
    /*
    const dispatch = useDispatch();
    useEffect(() => {
        
      dispatch( fotoLoading() );

    }, [ dispatch ])
    */

    const sacaFoto = () => {
      return async() => {
  
          try {
              const resp = await fetchConToken( 'foto' );
              const body = await resp.json();
              
              const fotos = body.fotos;

              let base = fotos.map(function(element){
                if(uid === element.user){
                  return element.foto
                }
              })
              setFoto(base)
          } catch (error) {
              console.log(error)
          }
  
      }
  }

  return (
    <div>Aqui va la foto:
      <div>
      <img 
					className="img-fluid mt-2"
					src={foto   /*user?.profilePic*/}
				/>
      <button onClick={sacaFoto()}>Foto</button>
      </div>
    </div>
    
  )
}

export default MostrarFoto