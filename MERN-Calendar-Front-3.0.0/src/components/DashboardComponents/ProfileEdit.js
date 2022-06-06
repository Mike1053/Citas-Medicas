import React from 'react'
import '../Estilos/profileEdit.css'
import pic from '../images/superporky.jpg'
import { useForm } from '../../hooks/useForm';

export const ProfileEdit = () => {

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        nName: 'Nando',
        nEmail: 'nando@gmail.com',
        nFullName: 'Nando Macias',
        nEspeciality: 'Tanatologo',
    });

    const { nName, nEmail, nFullName, nEspeciality} = formRegisterValues;

  return (
    <>
    <div class="container rounded bg-white mt-5">
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src={pic} width="90"/>
            <span class="font-weight-bold">{nFullName}</span>
            <span class="text-black-50">{nEmail}</span>
            </div>
        </div>
        <div class="col-md-8">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex flex-row align-items-center back"><i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                        <h6>Back to home</h6>
                    </div>
                    <h6 class="text-right">Edit Profile</h6>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="userName" value={nName}/></div>
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Nombre completo" value={nFullName}/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Email" value={nEmail}/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="+19685969668" placeholder="Phone number"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="address" value="D-113, right avenue block, CA,USA"/></div>
                    <div class="col-md-6"><input type="text" class="form-control" value="USA" placeholder="Country"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="address" value="D-113, right avenue block, CA,USA"/></div>
                </div>
                <div class="mt-5 text-right"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
    </div>
</div>
</>
  )
}
