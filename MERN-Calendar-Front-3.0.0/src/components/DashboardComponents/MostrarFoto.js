import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const MostrarFoto = () => {
    const dispatch = useDispatch();
    const { uid } = useSelector( state => state.auth );
    const { events, activeEvent } = useSelector( state => state.calendar );
    console.log("los eventos------");
    console.log(events);
    console.log("los eventos------");
  return (
    <div>jejejeje{uid}</div>
  )
}

export default MostrarFoto