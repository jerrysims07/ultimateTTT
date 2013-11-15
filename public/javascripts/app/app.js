/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  initializeBoard();

  $('#ultimateBoard').on('click', '.active', clickUltimateBoard);
}

function initializeBoard()
{
  // assign 'active' class to all squares
  $('.square').addClass('active');
}

function clickUltimateBoard()
{
  console.log('clicked active');

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
