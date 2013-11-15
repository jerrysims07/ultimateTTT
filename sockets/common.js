var async = require('async')
var __ = require('lodash')
var io

exports.connection = function(socket){
  io = this
  socket.emit('connected', {status: 'connected'})
  socket.on('disconnect', socketDisconnect)
  socket.on('startgame', socketStartGame)
  socket.on('move', socketMove)
};

function socketDisconnect(){
}
