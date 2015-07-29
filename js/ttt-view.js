(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
  };

  View.prototype.bindEvents = function () {
  };

  View.prototype.makeMove = function ($square) {
  };

  View.prototype.setupBoard = function () {
    var $grid = $("<div></div>").addClass('grid');
    var $row1 = $('<div></div>');
    var $row2 = $('<div></div>');
    var $row3 = $('<div></div>');

    var rows = [$row1, $row2, $row3];
    rows.forEach(function ($row, index) {
      for (var i = 0; i <  3; i++) {
        $row.addClass('row');
        var $cell = $('<div></div>').addClass('cell')
                                    .data('col', i)
                                    .data('row', index)
                                    .addClass('unclicked');
        $row.append($cell);
      }
      $grid.append($row);
    });
    this.$el.append($grid);
  };
})();
