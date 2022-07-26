import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const CalendarEvent = ({ event }) => {
    /*Conejo se arma el mostrar----------------------------------------*/
    /*Conejo se arma el mostrar----------------------------------------*/
    const { uid } = useSelector( state => state.auth );
    const { title, user } = event;
    
    return (
        <div>
            <strong> { title } </strong>
            {<span> { user.name } </span>}
        </div>
    )
    }
