import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import pic from '../images/superporky.jpg'
import moment from 'moment';
import UploadImage from '../auth/UploadImage';
import MostrarFoto from '../DashboardComponents/MostrarFoto';
import SimpleChat from '../DashboardComponents/SimpleChat';
import "./Dashboard.css";

moment.locale('es');


const DashboardMensajes = () => {
    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );
    const handleLogout = () => {
        dispatch( startLogout() );
    }
  return (
    <div>

        


<div className="page">
  
  <div class="pageHeader">
    <div class="title">Bienvenido {name} <img class = "circular--square" src={pic} width="40" height="40"/></div>
    <div class="userPanel"><span class="username"><button 
                className="btn btn-light colorletra"
                onClick={ handleLogout }
            >
                <span> Salir</span>
            </button></span></div>
  </div>
  <div className="main">
    <div className="nav">
      <div className="menu">
        <div class="title">Navegación</div>
        <ul>

          {/* Aqui van a ir los componentes del dashboard */}

          <li><a href='/'><i class="fa fa-calendar"></i>Calendario</a></li>
          <li><a href='/consultorios'><i class="fa fa-thumb-tack"></i> Consultorios</a></li>
          <li><a href='/pacientes'><i class="fa fa-group"></i>Pacientes</a></li>
          <li><a href='/videochat'><i class="fa fa-video-camera"></i>Video Chat</a></li>
          <li class="active"><i class="fa fa-envelope"></i>Mensajes</li>
          <li><a href='/ajustes'><i class="fa fa-gear"></i>Ajustes</a></li>



        </ul>
      </div>
    </div>
    <div class="view">
      <br></br>
      {/*
      <UploadImage/>
      <MostrarFoto/>
      <Chat/>
      */}
       <SimpleChat/>
    </div>
  </div>
</div>


    </div>
    
  )
}

export default DashboardMensajes