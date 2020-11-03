//Servicor - consola
const fs = require('fs');
const { request } = require('http');

module.exports = function( io ){
    
    let nickNames = [];
    let totalConectados = [0]
    let enVivo = [2133];
    let totalLikes = [0];
    let totalDislikes = [0];
    io.on( 'connection' , socket => {
        console.log('Un nuevo usuario conectado');
        let lifeResta = enVivo[0] + 1;
        let totalGuardar = totalConectados[0] + 1;
        enVivo.splice( 0 , 1 , lifeResta );
        io.sockets.emit('imprimirLikes', totalLikes )
        io.sockets.emit('imprimirDislikes' , totalDislikes)
        io.sockets.emit('enVivo' , enVivo);
        //Total de conectados
        totalConectados.splice( 0 , 1 , totalGuardar)
        fs.writeFile("src/public/db/conectados.txt" ,  ` Total conectados : ${totalConectados[0]} ` , (err) => {
            if ( err ) throw new Error(" Error" , err)
        })
        

        

        socket.on('new user' , (data , cb) => {
            console.log(data); // imprimir el nickname del usuario en console
            if ( nickNames.indexOf( data ) != -1){

                cb(false)
                
            }else{
                cb(true)
                socket.nickName =  data;
                nickNames.push(socket.nickName)
                console.log(nickNames);
                updateNickName()

            }
        });


        socket.on('clave' , ( data , cb ) => {

            if( data == "AdminUno" || data == "AdminDos"){
                cb(true)
            }else{
                cb(false)
            }
            
        })


        socket.on('send message' , function( data ){  // Resive el mensaje
            io.sockets.emit('new message' , {    //De aqui envio informacion
                 msg : data,
                 nick : "User"
            }) // Retrasmit el mensaje
        })
        
        socket.on('disconnect' , data => {
              /*   if(!socket.nickName ) return;
                nickNames.splice(nickNames.indexOf(socket.nickName) , 1);
                updateNickName(); */
                console.log('Usuario desconectado');
                let resta = enVivo[0] - 1;
                enVivo.splice( 0 , 1 , resta )
                io.sockets.emit('enVivo' , enVivo);
        })  

        function updateNickName (){
            io.sockets.emit('userNames' , nickNames)
        }

       /*  socket.on('like' , ( data , cb ) => {
            let sumaData = totalLikes[0] + data;
            totalLikes.splice( 0 , 1 , sumaData );
            cb(totalLikes[0])
        }) */

        socket.on('like' , x => {
            let sumaData = totalLikes[0] + x;
            totalLikes.splice( 0 , 1 , sumaData );
            io.sockets.emit('imprimirLikes' , totalLikes[0])
        })


        socket.on('dislike' , x => {
            let restaData = 0
            if(x === true){
                restaData = totalDislikes[0] + 1;
                totalDislikes.splice( 0 , 1 , restaData);
            }else{
                restaData = totalDislikes[0] - 1;
                totalDislikes.splice( 0 , 1 , restaData);
            }

            io.sockets.emit("imprimirDislikes" , totalDislikes[0])
        })
        
        
    })
    
}