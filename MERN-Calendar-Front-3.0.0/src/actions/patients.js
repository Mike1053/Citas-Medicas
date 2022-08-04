import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';


export const patientStartAddNew = ( patient ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('patient', patient, 'POST');
            const body = await resp.json();

            console.log(body)

            if ( body.ok ) {
                patient.id = body.patient.id;
                patient.user = {
                    _id: uid,
                    name: name
                }
                console.log( patient );
                dispatch( patientAddNew( patient ) );
            }


        } catch (error) {
            console.log(error);
        }

        

    }
}



const patientAddNew = (patient) => ({
    type: types.patientAddNew,
    payload: patient
});

export const patientSetActive = (patient) => ({
    type: types.patientSetActive,
    payload: patient
});

export const patientClearActivePatient = () => ({ type: types.patientClearActivePatient });



export const patientStartUpdate = ( patient ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`task/${ patient.id }`, patient, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( patientUpdated( patient ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const patientUpdated = ( patient ) => ({
    type: types.patientUpdated,
    payload: patient
});


export const patientStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().patient.activePatient;
        try {
            const resp = await fetchConToken(`task/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( patientDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}


const patientDeleted = () => ({ type: types.patientDeleted });


export const patientStartLoading = async () => {

        try {
            const resp = await fetchConToken( 'auth/getPacientes' );
            const body = await resp.json();
            
            const patients = body.Pacientes_Guardados;
            let patientList = patients.map(function(element){
                return element
            })
            return patientList;
        } catch (error) {
            console.log(error)
        }  
}

const patientLoaded = (patients) => ({
    type: types.patientLoaded,
    payload: patients
})

export const patientLogout =() => ({ type: types.patientLogout });