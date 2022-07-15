import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';


export const officeStartAddNew = ( office ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('office', office, 'POST');
            const body = await resp.json();

            console.log(body)

            if ( body.ok ) {
                office.id = body.office.id;
                office.user = {
                    _id: uid,
                    name: name
                }
                console.log( office );
                dispatch( officeAddNew( office ) );
            }


        } catch (error) {
            console.log(error);
        }

        

    }
}



const officeAddNew = (office) => ({
    type: types.officeAddNew,
    payload: office
});

export const officeSetActive = (office) => ({
    type: types.officeSetActive,
    payload: office
});

export const officeClearActiveOffice = () => ({ type: types.officeClearActiveOffice });



export const officeStartUpdate = ( office ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`task/${ office.id }`, office, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( officeUpdated( office ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const officeUpdated = ( office ) => ({
    type: types.officeUpdated,
    payload: office
});


export const officeStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().office.activeOffice;
        try {
            const resp = await fetchConToken(`task/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( officeDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}


const officeDeleted = () => ({ type: types.officeDeleted });


export const officeStartLoading = async () => {

        try {
            const resp = await fetchConToken( 'locations/getLocations' );
            const body = await resp.json();
            /*Despues del body va el nombre de la colección */
            const offices = body.Consultorios_Guardados;

            let officeList = offices.map(function(element){
                return element
            })
            return officeList;
        } catch (error) {
            console.log(error)
        }  
}

const officeLoaded = (offices) => ({
    type: types.officeLoaded,
    payload: offices
})

export const officeLogout =() => ({ type: types.officeLogout });