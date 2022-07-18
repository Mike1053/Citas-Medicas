import React from 'react'

export const CalendarEvent = ({ event }) => {
    /*Conejo se arma el mostrar----------------------------------------*/
    console.log("el evento--------");
    console.log(event);
    /*Conejo se arma el mostrar----------------------------------------*/
    const { title, user } = event;
    
    return (
        <div>
            <strong> { title } </strong>
            {<span> { user.name } </span>}
        </div>
    )
    }
