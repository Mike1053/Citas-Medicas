import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import pic from '../images/blank-profile-picture.jpg';
import moment from 'moment';
import TaskUpload from '../task/taskUpload';
import TaskScreen from '../task/TaskScreen';
import "./Dashboard.css";
import PatientList from '../DashboardComponents/PatientList';


moment.locale('es');


const DashboardPacientes = () => {
    const dispatch = useDispatch();
    
    const { name } = useSelector( state => state.auth );
    
    const handleLogout = () => {
        dispatch( startLogout() );
    }
    
  return (
    <div>

        


<div className="page">
  
  <div class="pageHeader">
    <div class="title">Bienvenido Dr. {name} <img class = "circular--square" src={pic} width="40" height="40"/></div>
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

          <li class="active"><a href='/'><i class="fa fa-calendar"></i>Calendario</a></li>
          <li><a href='/notifications'><i class="fa fa-list"></i>Notificaciones</a></li>
          <li><a href='/consultorios'><i class="fa fa-thumb-tack"></i> Consultorios</a></li>
          <li class="active"><i class="fa fa-group"></i>Pacientes</li>
          <li><a href='/videochat'><i class="fa fa-video-camera"></i>Video Chat</a></li>
          <li><a href='/mensajes'><i class="fa fa-envelope"></i>Mensajes</a></li>
          <li><a href='/ajustes'><i class="fa fa-gear"></i>Ajustes</a></li>



        </ul>
      </div>
    </div>
    <div class="view">
      <br></br>
       {/* 
       <TaskUpload/>
       <TaskScreen/> 
       */}
       <PatientList/>
    </div>
  </div>
</div>


    </div>
    
  )
}

export default DashboardPacientes