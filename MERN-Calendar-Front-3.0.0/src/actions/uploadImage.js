import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { eventLogout } from './events';
import { prepareFotos } from '../helpers/prepareFotos';

export const uploadImage = (foto, user) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('foto/subirFoto', {foto, user}, 'POST');
            const body = await resp.json();

            console.log(body)

        } catch (error) {
            console.log(error);
        }
    } 
}

export const fotoLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'foto' );
            const body = await resp.json();

            const fotos = body.fotos;
            console.log(fotos)
            dispatch(fotos);

        } catch (error) {
            console.log(error)
        }

    }
}

const fotoLoaded = (foto) => ({
    type: types.fotoLoaded,
    payload: foto
})