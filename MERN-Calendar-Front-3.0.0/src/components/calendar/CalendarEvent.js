import React from 'react'

export const CalendarEvent = ({ event }) => {
    /*Conejo se arma el mostrar----------------------------------------*/
    /*Conejo se arma el mostrar----------------------------------------*/
    const { title, user } = event;
    
    return (
        <div>
            <strong> { title } </strong>
            {<span> { user.name } </span>}
        </div>
    )
    }
