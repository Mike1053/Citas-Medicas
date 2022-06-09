import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { eventLogout } from './events';

export const uploadImage = (foto, user) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('foto/subirFoto', {foto, user}, 'POST');
            const body = await resp.json();

            console.log(body)
            /*
            if ( body.ok ) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log( event );
                dispatch( eventAddNew( event ) );
            }
            */

        } catch (error) {
            console.log(error);
        }

    }

  
}
