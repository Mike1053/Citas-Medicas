const moment = require('moment');

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }

    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        /*res.json({
            msg: 
        })*/
        return false;
    }
    
}



module.exports = { isDate };


