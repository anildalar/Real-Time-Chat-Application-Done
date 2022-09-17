const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

//io.on(eventName,cbfn)
io.on('connection',(socket)=>{
    console.log('Client Connected ',socket.id);
    socket.on('disconnect',()=>{
        console.log('Client Disconnected ',socket.id);
    })

    socket.on('clientevent',(payload)=>{
        console.log('Client payload ',payload);

        //Speak
        io.emit('serverevent',payload); //Speak
    }) ;// Listing
})

app.get('/',(req,res)=>{
   /*  res.status(200).json({
        msg:"ok"
    }); */
    //console.log(__dirname);
    res.sendFile(__dirname+'/index.html');
});


let port=3000;
server.listen(port,()=>{
    console.log('The is running on port ',port)
})