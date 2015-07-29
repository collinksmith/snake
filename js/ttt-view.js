(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$grid = $("<div></div>").addClass('grid');
    this.$el = $el;
    console.log(this);
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var self = this;
    this.$grid.on('click', '.cell', function(event) {
      var $targetEl = $(event.target);
      self.makeMove($targetEl);
    });
  };

  View.prototype.makeMove = function ($square) {
    $square.addClass('x');
    $square.toggleClass('unclicked');
  };

  View.prototype.setupBoard = function () {
    var $row1 = $('<div></div>');
    var $row2 = $('<div></div>');
    var $row3 = $('<div></div>');

    var grid = this.$grid;
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
      grid.append($row);
    });
    this.$el.append(this.$grid);
  };
})();
