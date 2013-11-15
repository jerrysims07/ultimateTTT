/* global document, window, io */

$(document).ready(initialize);

var socket;
var activePlayer = 'X';
var miniBoards = [];
var ultimateBoard = [0,0,0,0,0,0,0,0,0];

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

  // initialize the miniBoards
  for (var i=0; i<9; i++)
  {
    miniBoards[i] = [];
    for(var j=0; j<9; j++)
      miniBoards[i][j]=0;
  }
}

function clickUltimateBoard()
{
  var $this = $(this);
  $this.text(activePlayer);
  updateBoardArray($this);
  updateActiveSquares($this);

  // test for win
    // test for ultimate win

  // Switch players
  activePlayer = (activePlayer === 'X') ? 'O' : 'X';



}

function updateActiveSquares($this)
{
  // Update active squares
  $('.square').removeClass('active');
  var nextBoard = $this.attr('data-square');
  var activeSquares = $('.square[data-board =' + nextBoard + ']');
  for(var i = 0; i < activeSquares.length; i++){
    if(!$(activeSquares[i]).text())
      $(activeSquares[i]).addClass('active');
  }
}

function updateBoardArray($this)
{
  // get the x and y coordinates out of 'this'
  var x = $this.attr('data-board');
  var y = $this.attr('data-square');

  // assign 1 or 2 ('x' or 'o') to corresponding array position
  miniBoards[x][y]= (activePlayer === 'X') ? 1 : 2;
  console.log('board '+x+': ');
  console.log(miniBoards[x]);
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
