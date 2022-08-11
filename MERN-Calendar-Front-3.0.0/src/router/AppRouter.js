import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { RegisterScreenDoctor } from '../components/auth/RegisterScreenDoctor';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { UploadImage } from '../components/auth/UploadImage';

import Dashboard from '../components/dashboard/Dashboard';
import DashboardConsultorios from '../components/dashboard/DashboardConsultorios';
import DashboardConsultorios2 from '../components/dashboard/DashboardConsultorios2';
import DashboardPacientes from '../components/dashboard/DashboardPacientes';
import DashboardVideoChat from '../components/dashboard/DashboardVideoChat';
import DashboardMensajes from '../components/dashboard/DashboardMensajes';
import DashboardAjustes from '../components/dashboard/DashboardAjustes';
import DashboardNotifications from '../components/dashboard/DashboardNotifications';
import { ProfileEdit } from '../components/DashboardComponents/ProfileEdit';
import Logout from '../components/auth/Logout';
import MapView from '../components/mapa/MapView';
import { DoctorRegister } from '../components/auth/DoctorRegister';
import "../components/leaf.css";


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div className='router-div'>
                <Switch>

                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />

                    <PublicRoute
                        exact
                        path="/logout"
                        component={ Logout }
                    />

                    <PublicRoute 
                        exact 
                        path="/register" 
                        component={ RegisterScreen }
                        isAuthenticated={ !!uid }
                    />

                    <PublicRoute 
                        exact 
                        path="/registerDoctor" 
                        component={ RegisterScreenDoctor }
                        isAuthenticated={ !!uid }
                    />
                    <PublicRoute 
                        exact 
                        path="/doctorRegister" 
                        component={ DoctorRegister }
                        isAuthenticated={ !!uid }
                    />

                    <PublicRoute 
                        exact 
                        path="/profileEdit" 
                        component={ ProfileEdit }
                        isAuthenticated={ !!uid }
                    />

                    <PublicRoute 
                        exact 
                        path="/uploadImage" 
                        component={ UploadImage }
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ Dashboard } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/consultorios" 
                        component={ DashboardConsultorios } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/consultorios2" 
                        component={ DashboardConsultorios2 } 
                        isAuthenticated={ !!uid }
                    />

                     <PrivateRoute 
                        exact 
                        path="/map" 
                        component={ MapView } 
                        isAuthenticated={ !!uid }
                    /> 

                    <Route path="/map">
                        <MapView/>
                    </Route>
                    
                    <PrivateRoute 
                        exact 
                        path="/pacientes" 
                        component={ DashboardPacientes } 
                        isAuthenticated={ !!uid }
                    />
                     <PrivateRoute 
                        exact 
                        path="/videochat" 
                        component={ DashboardVideoChat } 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        exact 
                        path="/mensajes" 
                        component={ DashboardMensajes } 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        exact 
                        path="/ajustes" 
                        component={ DashboardAjustes } 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute
                        exact
                        path="/notifications"
                        component={ DashboardNotifications }
                        isAuthenticated={ !!uid }
                    
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
