// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // create a check variable to update if row has something present
      var check = 0;
      // for each item in this[att][index]
      for (var i = 0; i < this.rows()[rowIndex].length; i++) {
        // if item contains more than one one
        if (this.rows()[rowIndex][i]) {
          check++;
        }
        // if row has more that 1 than it has a row conflict
        if (check > 1) {
          return true;
        }
      }
      // if loop is complete and check is not > 1 then no conflict is present
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // for each row
      for (var row in this.rows()) {
        // if row has conflict return true
        if (this.hasRowConflictAt(row)) {
          return true;
        }
      }
      // if not rows have conflict return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // creaate a check to keep count if 2 non zeros are on the same column
      var colCheck = 0;
      // for each matrix
      for (var i = 0; i < this.rows().length; i++){
        // if each row at column i if element at this position is not zero count++
        if (this.rows()[i][colIndex]) {
          colCheck++;
          // if more than two non zeros then there is a conflict
          if (colCheck > 1) {
            return true;
          }
        }
      }
      // if no conflict return false
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // for each column (this function just checks n, it doesnt actually check columns)
      for (var i = 0; i < this.rows().length; i++) {
        // if column has conflict then its bad
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      // if not columms have  no conflicts
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(row, column) {
      var check = 0;
      // while in a valid square
      while (row < this.rows().length && column < this.rows().length) {
        // if square is unequal to 0 then increment check
        if (this.rows()[row][column]) {
          check++;
        } 
        // if there is more than 1 then there is a conflict
        if (check > 1) {
          return true;
        }
        // check down 1 and right 1
        row++;
        column++;
      }
      // if check never reaches 2 then there is no confict
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // pass in all of row 0 except for row0[n]
      var row = 0;
      for (var i = 0; i < this.rows().length - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(row, i)) {
          return true;
        }
      }
      // pass in all of column 0 except column0[0] and column0[n]
      var column = 0;
      for (var i = 1; i < this.rows().length - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(i, column)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(row, column) {
      var check = 0;
      // while in a valid square
      while (row < this.rows().length && column >= 0) {
        // if square is unequal to 0 then increment check
        if (this.rows()[row][column]) {
          check++;
        } 
        // if there is more than 1 then there is a conflict
        if (check > 1) {
          return true;
        }
        // check down 1 and left 1
        row++;
        column--;
      }
      // if check never reaches 2 then there is no confict
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // pass in all of row0 except final0[0]
      var row = 0;
      for (var i = 1; i < this.rows().length; i++) {
        if (this.hasMinorDiagonalConflictAt(row, i)) {
          return true;
        }
      }
      // pass in all of finalColumn except finalColumn[n] and finalColumn[0]
      var column = this.rows().length - 1;
      for (var i = 1; i < this.rows().length - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i, column)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
