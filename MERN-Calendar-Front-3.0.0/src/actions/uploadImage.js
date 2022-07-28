import { fetchConToken } from '../helpers/fetch';

export const uploadImage = (foto, user) => {
    return async() => {

        try {
            const resp = await fetchConToken('foto/subirFoto', {foto, user}, 'POST');
            const body = await resp.json();

            console.log(body)

        } catch (error) {
            console.log(error);
        }
    } 
}

export const updateImage = (foto) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`foto/${ foto.id }`, foto, 'PUT' );
            const body = await resp.json();
            console.log(body);
        } catch (error) {
            console.log(error)
        }

    }
}

export const fotoLoading = async () => {
        try {
            const resp = await fetchConToken( 'foto' );
            const body = await resp.json();
            
            const fotos = body.fotos;

            let base = fotos.map(function(element){
                return element
            })
            return base;
        } catch (error) {
            console.log(error)
        }
}