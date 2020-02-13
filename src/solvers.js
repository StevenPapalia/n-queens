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
      board.rows()[currentRow][column] = 1;
      // check if conflict occurs
      var i = column;
      while (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
        // remove conflict
        board.rows()[currentRow][column] = 0;
        // check board.rows[row][colcheck+1] is a valid square add 1 there
        if (board.rows()[currentRow][i + 1]) {
          board.rows()[currentRow][i + 1] = 1;
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
  var addRookToRow = function(currentRow) {
    // check if any conflicts occur every round
    if (currentRow === n - 1) {
      solutionCount++;
      // if (!hasAnyRowConFlicts && !hasAnyColConflicts) {solution.push}
      return;
    }
    for (var column = 0; column < n; column++) {
      board.rows()[currentRow][column] = 1;
      // check if conflict occurs
      // if it does ... board.rows()[currentRow][column] = 0;
      // add peice to board.row()[column+1] if still a problem keep going until column+1===n then move on to next row
      addRookToRow(currentRow + 1);
      // board.rows()[currentRow][column] = 0;
    }
  };
  addRookToRow(0);
  // console.log(solutionCount + 'num');
  // console.log(board);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount; //.rows();
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
