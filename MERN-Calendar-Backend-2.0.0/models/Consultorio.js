const { Schema, model } = require('mongoose');
const moment = require('moment');

const ConsultorioSchema = Schema({
    name:{
        type: String
    },
    direccion: {
        calle:{
            type: String
        },
        colonia:{
            type: String
        },
        numExt:{
            type: Number
        },
        cp:{
            type: Number 
        },
        cd:{
            type:String
        },
        estado:{
            type: String
        },
        pais:{
            type: String
        },
        latitud:{
            type: String
        },
        longitud: {
            type: String
        }
    },
    telefono: {
        type: String
    },
    numCons:{
        type: String
    },
    Horario:{
        Lunes:{
            work:{
                type: Boolean
            },
            start:{
                type: Date
            },
            end:{
                type: Date
            }
        },
        Martes:{
            work:{
                type: Boolean
            },
            start:{
                type: Date
            },
            end:{
                type: Date
            }
        },
        Miercoles:{
            work:{
                type: Boolean
            },
            start:{
                type: Date
            },
            end:{
                type: Date
            }
        },
        Jueves:{
            work:{
                type: Boolean
            },
            start:{
                type: Date
            },
            end:{
                type: Date
            }
        },
        Viernes:{
            work:{
                type: Boolean
            },
            start:{
                type: Date
            },
            end:{
                type: Date
            }
        },
        Sabado:{
            work:{
                type: Boolean
            },
            start:{
                type: Date
            },
            end:{
                type: Date
            }
        },
        Domingo:{
            work:{
                type: Boolean
            },
            start:{
                type: Date
            },
            end:{
                type: Date
            }
        }
    },
    usuarioDoctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
});


module.exports = model('Consultorio', ConsultorioSchema );