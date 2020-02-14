/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {


  var board = new Board({n: n});
  var rookCount = 0;

  var addRookToRow = function(currentRow) {
    if (rookCount === n) { return; }
    // add rook to board[row][column]
    for (var column = 0; column < n; column++) {
      board.togglePiece(currentRow, column);
      // check if conflict occurs
      var i = column;
      while (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
        // remove conflict
        board.togglePiece(currentRow, column);
        // check board.rows[row][colcheck+1] is a valid square add 1 there
        if (board.rows()[currentRow][i + 1]) {
          board.togglePiece(currentRow, i + 1);
        }
        i++;
      } 
    }
    rookCount++;
    addRookToRow(currentRow + 1);
  };
  addRookToRow(0);
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var findSolution = function(row) {
    // base case if all rows exhausted
    if (row === n) {
    // increment solutionCount and stop
      solutionCount++;
      return;
    }
    // iterate over possible solution
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // recurse into remaining problem
      if (!board.hasAnyRooksConflicts()) {
        findSolution(row + 1);
      }
      // unplace piece
      board.togglePiece(row, i);
    }
  };
  findSolution(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount; 
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solutions = [];
  var board = new Board({n: n});
  var findSolution = function(row) {
    // base case if all rows exhausted
    if (row === n) {
    // capture solution and stop
      var oneSolution = [];
      for (var i = 0; i < n; i++) {
        oneSolution.push(board.rows()[i].slice());
      }
      solutions.push(oneSolution);
      return;
    }
    // iterate over possible solution
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // recurse into remaining problem
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      }
      // unplace piece
      board.togglePiece(row, i);
    }
  };
  findSolution(0);
  if (solutions.length < 1) {
    solutions.push(board.rows());
  }
  console.log('Number of solutions for ' + n + ' queens:', solutions[0]);
  return solutions[0]; 

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var findSolution = function(row) {
    // base case if all rows exhausted
    if (row === n) {
    // increment solutionCount and stop
      solutionCount++;
      return;
    }
    // iterate over possible solution
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // recurse into remaining problem
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      }
      // unplace piece
      board.togglePiece(row, i);
    }
  };
  findSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount; 
};
