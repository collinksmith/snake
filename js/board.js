;(function () {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Board = Snake.Board = function () {
    this.grid = this.setBoard();
    this.snake = new Snake();
  };

  Board.prototype.setBoard = function () {
    var grid = [];
    for (var i = 0; i < 8; i++) {
      var row = [];
      for (var j = 0; j < 8; j++) {
        row[j] = new Snake.Board.Square();
      }
      grid.push(row);
    }
    return grid;
  };

  Board.prototype.render = function () {
    var rows = [];
    for (var i = 0; i < this.grid.length; i++) {
      var row = "";
      for(var j = 0; j < this.grid[i].length; j++) {
        row += ".";
      }
      rows.push(row);
    }

    var self = this;

    this.snake.segments.forEach(function (coord) {
      if (self.offBoard(coord)) {
        throw {name: "GameOver", message: "Snake ran off the board"};
      }
      var row = rows[coord.y];
      row = row.slice(0,coord.x) + "S" + row.slice(coord.x + 1);
      rows[coord.y] = row;
    });
    return rows.join("\n");
  };
  var Square = Snake.Board.Square = function () {

  };

  Board.prototype.offBoard = function (coord) {
    return coord.x > 7 || coord.x < 0 || coord.y > 7 || coord.y < 0;
  };
})();