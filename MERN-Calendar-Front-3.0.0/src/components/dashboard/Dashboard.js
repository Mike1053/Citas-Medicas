import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import pic from '../images/superporky.jpg'
import moment from 'moment';
import { CalendarScreen } from '../calendar/CalendarScreen';

moment.locale('es');


const Dashboard = () => {
    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );
    const handleLogout = () => {
        dispatch( startLogout() );
    }
  return (
    <div>

        


<div className="page">
  
  <div class="pageHeader">
    <div class="title">Bienvenido {name} <img src={pic} width="40" height="40"/></div>
    <div class="userPanel"><span class="username"><button 
                className="btn btn-danger"
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
          <li> <i class="fa fa-calendar"></i>Calendario</li>
          <li><i class="fa fa-group"></i>Pacientes</li>
          <li class="active"> <i class="fa fa-tasks"></i>Tareas</li>
          <li> <i class="fa fa-envelope"></i>Mensajes</li>
          <li> <i class="fa fa-gear"></i>Ajustes</li>
        </ul>
      </div>
    </div>
    <div class="view">
      <br></br>
      <CalendarScreen/>
       
    </div>
  </div>
</div>


    </div>
    
  )
}

export default Dashboard