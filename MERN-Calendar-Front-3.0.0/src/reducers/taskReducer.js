import { types } from '../types/types';

const initialState = {
    task: [],
    activeTask: null
};


export const taskReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.taskSetActive:
            return {
                ...state,
                activeTask: action.payload
            }
        
        case types.taskAddNew:
            return {
                ...state,
                task: [
                    ...state.task,
                    action.payload
                ]
            }
    
        case types.taskClearActiveTask:
            return {
                ...state,
                activeTask: null
            }


        case types.taskUpdated:
            return {
                ...state,
                task: state.task.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        
        case types.taskDeleted:
            return {
                ...state,
                task: state.task.filter(
                    e => ( e.id !== state.activeTask.id )
                ),
                activeTask: null
            }

        case types.taskLoaded:
            return {
                ...state,
                task: [ ...action.payload ]
            }

        case types.taskLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}
