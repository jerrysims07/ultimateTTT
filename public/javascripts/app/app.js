/* global document, window, io */

$(document).ready(initialize);

var socket;
var activePlayer = 'X';
var miniBoards = [];
var ultimateBoard = [0,0,0,0,0,0,0,0,0];
var winFlag = {};

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
  var board = $this.attr('data-board');

  // test for win
    // test for ultimate win
  testForWin(board);



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



function testForWin(board){
  winFlag.rowOne = rowOne(board);
  // rowTwo(board);
  // rowThree(board);
}


// Test Win functions

function rowOne(board){
  return (miniBoards[board][0] && (miniBoards[board][0] === miniBoards[board][1] && miniBoards[board][0] === miniBoards[board][2]));
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
