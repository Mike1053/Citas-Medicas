import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegisterMedic } from '../../actions/auth';
import Swal from 'sweetalert2';

import './login.css';

export const RegisterScreenDoctor = () => {

    const dispatch = useDispatch();

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: 'Nando',
        rEmail: 'nando@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456',
        rCedula: '123456',
        rEspecialidad: 'Tanatologo',
        rFullName: 'Nando Macias'
    });
    
    const { rName, rEmail, rPassword1, rPassword2, rCedula, rEspecialidad, rFullName} = formRegisterValues;

    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales','error');
        }
        console.log('?')
        dispatch( startRegisterMedic( rEmail, rPassword1, rName, rCedula, rEspecialidad , rFullName) );
    }

    return (
        <div className="container login-container">
                <div className="col-md-6 login-form-2">
                    <h3>Registro Doctor</h3>
                    <form onSubmit={ handleRegister }>
                        
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cedula"
                                name="rCedula"
                                value={ rCedula }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Especialidades"
                                name="rEspecialidad"
                                value={ rEspecialidad }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre completo"
                                name="rFullName"
                                value={ rFullName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        {/**
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={()=>console.log("Cambia")}/>
                            <label class="form-check-label" for="exampleCheck1">Soy médico</label>
                        </div> 
                        */}

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div> 
                        <a href='/login'>Ya tienes una cuenta</a>
                    </form>
                </div>
            </div>

            
    )
}