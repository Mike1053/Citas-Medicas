import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';


export const taskStartAddNew = ( task ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('task', task, 'POST');
            const body = await resp.json();

            console.log(body)

            if ( body.ok ) {
                task.id = body.task.id;
                task.user = {
                    _id: uid,
                    name: name
                }
                console.log( task );
                dispatch( taskAddNew( task ) );
            }


        } catch (error) {
            console.log(error);
        }

        

    }
}



const taskAddNew = (task) => ({
    type: types.taskAddNew,
    payload: task
});

export const taskSetActive = (task) => ({
    type: types.taskSetActive,
    payload: task
});

export const taskClearActivetask = () => ({ type: types.taskClearActiveTask });



export const taskStartUpdate = ( task ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`task/${ task.id }`, task, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( taskUpdated( task ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

const taskUpdated = ( task ) => ({
    type: types.taskUpdated,
    payload: task
});


export const taskStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().task.activeTask;
        try {
            const resp = await fetchConToken(`task/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( taskDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}


const taskDeleted = () => ({ type: types.taskDeleted });


export const taskStartLoading = async () => {

        try {
            const resp = await fetchConToken( 'task' );
            const body = await resp.json();
            
            const tasks = body.task;
            
            let taskList = tasks.map(function(element){
                return element
            })
            return taskList;
        } catch (error) {
            console.log(error)
        }  
}

export const taskLogout =() => ({ type: types.taskLogout });