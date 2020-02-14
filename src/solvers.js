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
  var board = new Board({n: n});
  // edge case 0 and 1
  if (n === 0) { return board.rows(); }
  if (n === 1) { 
    board.togglePiece(0, 0);
    return board.rows();
  }
  if (n === 2 || n === 3) { return 0; }
  // // if even
  // var queenCount = 0;
  // if (n % 2 === 0) {
  //   board.togglePiece(0, 1);
  //   queenCount++;
  //   // if odd
  // } else {
  //   board.togglePiece(0, 0);
  //   queenCount++;
  // }

  // var squaresChecked = 0;

  // var addQueenToRow = function(currentRow, currentColumn) {
  //   if (queenCount === n) { return; }
  //   if (squaresChecked > n * n * n) {
  //     return 0;
  //   }
  //   // for each column in currentRow starting at currentColumn
  //   while (currentColumn < n) {
  //     squaresChecked++;
  //     // add 1 to board[currentRow][currentCol]
  //     board.togglePiece(currentRow, currentColumn);
  //     console.log(currentRow, currentColumn);
  //     // check for conflict if conflict occurs 
  //     while (board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
  //       // add 0 to board[currentRow][currentCol]
  //       console.log('conflict');
  //       board.togglePiece(currentRow, currentColumn);
  //       // add 1 to board[currentRow][currentCol + 1] if valid square
  //       if (board.rows()[currentRow][currentColumn + 1] !== undefined) {
  //         board.togglePiece(currentRow, currentColumn + 1);
  //         if (currentColumn < n - 1) { 
  //           currentColumn++; 
  //         } else {
  //           return addQueenToRow(currentRow, 0);
  //         }
  //       } else {
  //         return addQueenToRow(currentRow, 0);
  //       }
  //     }
  //     queenCount++;
  //     return addQueenToRow(currentRow + 1, currentColumn);
  //   }
  // };
  // addQueenToRow(1, 2);

  var findSolution = function(row) {
    // base case if all rows exhausted
    if (row === n) {
    // increment solutionCount and stop
      return board.rows();
    }
    // iterate over possible solution
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // recurse into remaining problem
      if (!board.hasAnyQueensConflicts()) {
        return findSolution(row + 1);
      }
      // unplace piece
      board.togglePiece(row, i);
    }
  };
  return findSolution(0);
  console.log('single solution for ' + n + ' queens:', solution);
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
