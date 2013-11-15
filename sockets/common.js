var async = require('async');
var __ = require('lodash');
var m = require('../lib/mechanics');
var io;

exports.connection = function(socket){
  io = this
  socket.emit('connected', {status: 'connected'})
  socket.on('disconnect', socketDisconnect)
  socket.on('startgame', socketStartGame)
  socket.on('playermoved', socketPlayerMoved)
};

function socketStartGame(data){
  var storage = {}
  var socket = this
  async.waterfall([
    function(next){m.findGame(data.game,next);},
    function(game,next){unless(game){m.newGame(data.game,next);}else{next(null,game);}},
    function(game,next){storage.game=game;next();},
    function(next){m.findPlayer(data.player,next);},
    function(player,next){unless(player){m.newPlayer(data.player,data.color,next);}else{next(null,player);}},
    function(player,next){m.resetPlayer(player,socket,next);},
    function(player,next){storage.player=player;next();},
    function(next){next(null,__.any(storage.game.players,function(p){return p.id===storage.player.id;}));},
    function(isFound,next){unless(isFound){m.attachPlayer(storage.game,storage.player,next);}else{next(null,storage.game);}},
    function(game,next){m.findGame(data.game,next);},
    function(game,next){storage.game=game;next();},
    function(next){m.emitMessage(io.sockets,storage.game.players,'playerjoined',{players:storage.game.players},next);}
  ])
};

function socketPlayerMoved(){
  async.waterfall([
    function(next){m.findPlayer(data.player,next);},
    function(player,next){m.updateBoard(player,data.board,next)}
    function(player,next){m.findGame(data.game,next);},
    function(game,next){m.emitMessage(io.sockets,game.players,'playerjoined',{players:game.players},next);}
  ])
};

function socketDisconnect(){
};
