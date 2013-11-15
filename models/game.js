var mongoose = require('mongoose');

var Game = mongoose.Schema({
  players   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
  board     : {type: Array, default:
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
              };
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Game', Game);
