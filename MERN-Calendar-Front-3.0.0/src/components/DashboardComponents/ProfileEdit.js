import React from 'react'
import '../Estilos/profileEdit.css'
import pic from '../images/superporky.jpg'
import { useForm } from '../../hooks/useForm';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import moment from 'moment';

moment.locale('es');

export const ProfileEdit = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );
    const { email } = useSelector( state => state.auth );
    const { license } = useSelector( state => state.auth );
    const { fullName } = useSelector( state => state.auth );
    const { speciality } = useSelector( state => state.auth );
    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        nName: name,
        nEmail: email,
        nFullName: name,
        nEspeciality: 'Urologo',
        nCountry: 'México',
        nAddress: 'Avenida Álvaro Obregón',
        nPhone: '+525589577288',
    });
    const { nName, nEmail, nFullName, nEspeciality, nCountry, nAddress, nPhone} = formRegisterValues;
    console.log(formRegisterValues);
  return (
    <>
    <div className="container rounded bg-white mt-5 fondo-ajustes">
    <div className="row">
        <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src={pic} width="150"/>
            <span className="font-weight-bold nombre">{name}</span>
            <span className="text-black-50">{nEmail}</span>
            </div>
        </div>
        <div className="col-md-8">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="text-right">Editar Perfil</h1>
                </div>
                <form>
                <div className="row mt-2">
                    <div className="col-md-6">Nombre<input type="text" className="form-control ajustes" placeholder="userName" name='nName' value={nName} onChange={handleRegisterInputChange}/></div>
                    <div className="col-md-6">Usuario<input type="text" className="form-control ajustes" placeholder="Nombre completo" name='nFullName' value={nFullName} onChange={handleRegisterInputChange}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">Correo<input type="email" className="form-control ajustes" placeholder="Email" name='nEmail' value={nEmail} onChange={handleRegisterInputChange}/></div>
                    <div className="col-md-6">Número telefónico<input type="text" className="form-control ajustes" placeholder="Phone number" name='nPhone' value={nPhone} onChange={handleRegisterInputChange}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">Dirección<input type="text" className="form-control ajustes" placeholder="address" name='nAddress' value={nAddress} onChange={handleRegisterInputChange}/></div>
                    <div className="col-md-6">País<input type="text" className="form-control ajustes" placeholder="Country" name='nCountry' value={nCountry} onChange={handleRegisterInputChange}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">Especialidad<input type="text" className="form-control ajustes" placeholder="especiality" name='nEspeciality' value={nEspeciality} onChange={handleRegisterInputChange}/></div>
                </div>
                <div className="mt-2 text-right py-2"><input className="btn btn-primary boton boton-update" type="submit" value="Actualizar"/></div>
                </form>
            </div>
        </div>
    </div>
</div>
</>
  )
}
