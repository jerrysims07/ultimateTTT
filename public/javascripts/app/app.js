/* global document, window, io */

$(document).ready(initialize);

var socket;
var activePlayer = 'X';

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  initializeBoard();

  $('#ultimate-board').on('click', '.active', clickUltimateBoard);
}

function initializeBoard()
{
  // assign 'active' class to all squares
  $('.square').addClass('active');
}

function clickUltimateBoard()
{
  var $this = $(this);
  $this.text(activePlayer);
  // Switch players
  activePlayer = (activePlayer === 'X') ? 'O' : 'X';
  // Update board array
  // Update active squares
  $('.square').removeClass('active');
  var nextBoard = $this.attr('data-square');
  var activeSquares = $('.square[data-board =' + nextBoard + ']');
  for(var i = 0; i < activeSquares.length; i++){
    if(!$(activeSquares[i]).text())
      $(activeSquares[i]).addClass('active');
  }
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
