import { types } from '../types/types';

const initialState = {
    office: [],
    activeOffice: null
};


export const officeReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.officeSetActive:
            return {
                ...state,
                activeOffice: action.payload
            }
        
        case types.officeAddNew:
            return {
                ...state,
                office: [
                    ...state.office,
                    action.payload
                ]
            }
    
        case types.officeClearActiveOffice:
            return {
                ...state,
                activeOffice: null
            }


        case types.officeUpdated:
            return {
                ...state,
                office: state.office.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        
        case types.officeDeleted:
            return {
                ...state,
                office: state.office.filter(
                    e => ( e.id !== state.activeOffice.id )
                ),
                activeOffice: null
            }

        case types.officeLoaded:
            return {
                ...state,
                office: [ ...action.payload ]
            }

        case types.officeLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}