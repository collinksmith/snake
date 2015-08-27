;(function() {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Snake = window.Snake = function () {
    this.dir = "N";
    this.segments = [new Coord(4, 4),
                     new Coord(4, 5),
                     new Coord(5, 5),
                     new Coord(5, 6),
                     new Coord(6, 6)];
  };

  Snake.prototype.move = function () {
    var head = this.segments[0];
    this.segments.splice(this.segments.length - 1, 1);
    var newCoord = head.move(this.dir);
    this.segments.unshift(newCoord);
  };

  Snake.prototype.turn = function (dir) {
    if (this.isOpposite(this.dir, dir)) {
      throw {name: "GameOver", message: "Snake ran back into itself"};
    } else {
      this.dir = dir;
    }
  };

  Snake.prototype.isOpposite = function (dir, newDir) {
    switch (dir) {
    case 'N':{
      if (newDir === 'S') {
        return true;
      }
      break;
    }
    case 'S':
      if (newDir === 'N') {
        return true;
      }
      break;
    case 'E':
      if (newDir === 'W') {
        return true;
      }
      break;
    case 'W':
      if (newDir === 'E') {
        return true;
      }
    }
  };

  var Coord = Snake.Coord = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.move = function (dir) {
    switch (dir) {
      case 'N':
        return new Coord(this.x, this.y - 1);
      case 'E':
        return new Coord(this.x + 1, this.y);
      case 'S':
        return new Coord(this.x, this.y + 1);
      case 'W':
        return new Coord(this.x - 1, this.y);
    }
  };

  Coord.prototype.equals = function (x, y) {
    return this.x === x && this.y === y;
  };

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
