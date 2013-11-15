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
  var tempWinFlag= testForWin(board);

  if(tempWinFlag )
  {
    // update ultimate Board array with active player
    ultimateBoard[board]= (activePlayer === 'X') ? 1 : 2;

    // send to browser winFlag for display
    // test for ultimate win
    var bigWinner = testForWin(ultimateBoard);

console.log('ultimateBoard: '+ultimateBoard);
console.log('big winner = '+bigWinner);
  }


  // Switch players
  activePlayer = (activePlayer === 'X') ? 'O' : 'X';
}

function updateActiveSquares($this)
{
  // Update active squares
  $('.square').removeClass('active');
  var nextBoard = $this.attr('data-square');
  var activeSquares = $('.square[data-board =' + nextBoard + ']');
  $('.square[data-board =' + nextBoard + ']').parent().addClass('high');
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
  winFlag = {};
  winFlag.rowOne = rowOne(board);
  winFlag.rowTwo = rowTwo(board);
  winFlag.rowThree = rowThree(board);
  winFlag.colOne = colOne(board);
  winFlag.colTwo = colTwo(board);
  winFlag.colThree = colThree(board);
  winFlag.diagRight = diagRight(board);
  winFlag.diagLeft = diagLeft(board);
console.log(winFlag);

  return (  winFlag.rowOne || winFlag.rowTwo || winFlag.rowThree ||
            winFlag.colOne || winFlag.colTwo || winFlag.colThree ||
            winFlag.diagRight || winFlag.diagLeft);
}


// Test Win functions

function rowOne(board){
  return (miniBoards[board][0] && (miniBoards[board][0] === miniBoards[board][1] && miniBoards[board][0] === miniBoards[board][2]));
}

function rowTwo(board){
  return (miniBoards[board][3] && (miniBoards[board][3] === miniBoards[board][4] && miniBoards[board][3] === miniBoards[board][5]));
}

function rowThree(board){
  return (miniBoards[board][6] && (miniBoards[board][6] === miniBoards[board][7] && miniBoards[board][6] === miniBoards[board][8]));
}

function colOne(board){
  return (miniBoards[board][0] && (miniBoards[board][0] === miniBoards[board][3] && miniBoards[board][6] === miniBoards[board][0]));
}

function colTwo(board){
  return (miniBoards[board][1] && (miniBoards[board][1] === miniBoards[board][4] && miniBoards[board][7] === miniBoards[board][1]));
}

function colThree(board){
  return (miniBoards[board][2] && (miniBoards[board][2] === miniBoards[board][5] && miniBoards[board][8] === miniBoards[board][2]));
}

function diagRight(board){
  return (miniBoards[board][0] && (miniBoards[board][0] === miniBoards[board][4] && miniBoards[board][0] === miniBoards[board][8]));
}

function diagLeft(board){
  return (miniBoards[board][2] && (miniBoards[board][2] === miniBoards[board][4] && miniBoards[board][2] === miniBoards[board][6]));
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
