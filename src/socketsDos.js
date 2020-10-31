const sockets = require("./socketsDos")
const user = require('./public/models/users');

function ioFnc( io ){
   
    
    io.on('connection' , async socket => {

        socket.on('usuario' , async ( { usuario , pass } , confirm ) => {

         let usuarioIn = await user.find({})

         let usuarioBien = usuarioIn.find( x => {
            return x.user == usuario && x.pass == pass
        })

        if( usuarioBien ){
            confirm( usuario )
        }else{
            confirm( false )
        }    
        })
       
        
        socket.on('comprobarUser' , ( user , result ) => {
            if( user.usuario === 'Alejo'  && user.pass === '1'  ){
                result( true )
            }
        })
        
    })

}

module.exports = {
    ioFnc
}