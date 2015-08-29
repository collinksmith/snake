;(function() {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Snake = window.Snake = function () {
    this.dir = "N";
    this.segments = [new Snake.Coord(4, 4),
                     new Snake.Coord(4, 5),
                     new Snake.Coord(5, 5),
                     new Snake.Coord(5, 6),
                     new Snake.Coord(6, 6)];
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
    case 'N':
      if (newDir === 'S') { return true; }
      break;
    case 'S':
      if (newDir === 'N') { return true; }
      break;
    case 'E':
      if (newDir === 'W') { return true; }
      break;
    case 'W':
      if (newDir === 'E') { return true; }
    }
  };
})();
