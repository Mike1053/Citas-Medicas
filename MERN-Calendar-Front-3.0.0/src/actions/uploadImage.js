import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { eventLogout } from './events';

export const uploadImage = (foto, user) => {
        return async( dispatch ) => {
    
            const resp = await fetchSinToken( 'foto', { foto, user}, 'POST' );
            const body = await resp.json();
    
            if( body.ok ) {
                localStorage.setItem('token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime() );
                /*
                dispatch( login({
                    uid: body.uid,
                    name: body.user,
                    foto: body.foto
                }) )
            } else {
                Swal.fire('Error', body.msg, 'error');*/
            }
        }
    

  
}
