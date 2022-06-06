import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
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
import Map from '../components/map/Map';
import Dashboard from '../components/dashboard/Dashboard';

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
            <div>
                <Switch>

                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
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

                    <PublicRoute 
                        exact 
                        path="/map" 
                        component={ Map }
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
