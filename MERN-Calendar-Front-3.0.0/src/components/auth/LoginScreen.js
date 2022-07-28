import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: ''
    });
    
    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    }

    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales','error');
        }
        console.log('?')
        dispatch( startRegister( rEmail, rPassword1, rName ) );
    }


    return (
        <div className="container login-container">
                <div className="col-md-4 login-form-2">
                    <h3>Inicia sesion</h3>
                    <form onSubmit={ handleLogin }>
                        {/*Logo del login*/}
                        <div className="logo">
                            <img src="./CitasMedicas.png" width="100" height="100"/>
                        </div>


                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>         
                    </form>
                    
                    <button
                        type="submit"
                        className="btnSubmit"
                        onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/doctorRegister';
                        }}
                        
                        > Registro
                    </button>
                    
                     
                    
                    
                    
                </div>
        </div>
    )
}