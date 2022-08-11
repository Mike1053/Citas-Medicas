import React from 'react'
import './doctorRegister.css'
import pic from '../images/blank-profile-picture.jpg';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import { startRegisterMedic } from '../../actions/auth';

moment.locale('es');

export const DoctorRegister = () => {

    const dispatch = useDispatch();

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
        rCedula: '',
        rEspecialidad: '',
        rFullName: '',
        rDireccion: '',
        rimg:'',
    });
    
    const { rName, rEmail, rPassword1, rPassword2, rCedula, rEspecialidad, rFullName, rDireccion, rimg} = formRegisterValues;

    const handleRegister = ( e ) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales','error');
        }
        dispatch( startRegisterMedic( rEmail, rPassword1, rName, rCedula, rEspecialidad , rFullName, rimg) );
    }

  return (
    <>
    <div className="container rounded bg-white mt-5 fondo-ajustes">
    <div className="row fondo-ajustes">
        <div className="col-md-8">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="text-right">Crear Perfil</h1>
                </div>
                <form onSubmit={ handleRegister }>
                <div className="row mt-2">
                    <div className="col-md-6">Nombre<input type="text" className="form-control ajustes" placeholder="Nombre completo" name='rName' value={rName} onChange={handleRegisterInputChange}/></div>
                    <div className="col-md-6">Usuario<input type="text" className="form-control ajustes" placeholder="Nombre de usuario" name='rFullName' value={rFullName} onChange={handleRegisterInputChange}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">Correo<input type="email" className="form-control ajustes" placeholder="Correo" name='rEmail' value={rEmail} onChange={handleRegisterInputChange}/></div>
                    <div className="col-md-6">Cédula<input type="text" className="form-control ajustes" placeholder="12345678" name='rCedula' value={rCedula} onChange={handleRegisterInputChange}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">Especialidad<input type="text" className="form-control ajustes" placeholder="Especialidad" name='rEspecialidad' value={rEspecialidad} onChange={handleRegisterInputChange}/></div>
                    <div className="col-md-6">Dirección<input type="text" className="form-control ajustes" placeholder="Dirección" name='rDireccion' value={rDireccion} onChange={handleRegisterInputChange}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">Contraseña<input type="password" className="form-control ajustes" placeholder="Contraseña" name='rPassword1' value={rPassword1} onChange={handleRegisterInputChange}/></div>
                    <div className="col-md-6">Confirmar contraseña<input type="password" className="form-control ajustes" placeholder="Confirmar contraseña" name='rPassword2' value={rPassword2} onChange={handleRegisterInputChange}/></div>
                </div>
                    <div className="row mt-3">
                    <div className="mt-2 text-right py-2 d-grid gap-2 col-6 mx-auto"><input className="btn btn-primary boton boton-update" type="submit" value="Confirmar"/></div>
                    <div className="mt-2 text-right py-2 d-grid gap-2 col-6 mx-auto">
                    <button
                        type="submit"
                        className="btn btn-primary boton boton-update"
                        onClick={(e) => {
                        e.preventDefault();
                        window.location.href='/login';
                        }}
                        > Ya tienes cuenta
                    </button>
                </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
</>
  )
}
