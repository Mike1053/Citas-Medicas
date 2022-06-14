import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const CalendarEvent = ({ event }) => {

    const { uid } = useSelector( state => state.auth );
    const { title, user } = event;
    
    return (
        <div>
            <strong> { title } </strong>
            {<span> { user.name } </span>}
        </div>
    )
    }
