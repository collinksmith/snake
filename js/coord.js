;(function () {
  if (typeof Snake === undefined) {
    window.Snake = {};
  }

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
})();