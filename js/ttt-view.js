(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$grid = $("<div></div>").addClass('grid');
    this.$el = $el;
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
    var currentMark = this.game.currentPlayer;

    try {
      this.game.playMove([$square.data('row'), $square.data('col')]);
      $square.addClass(currentMark);
      $square.toggleClass('unclicked');
    } catch (e) {
      if (e.msg === "Is not an empty position!") {
        alert("Invalid move.");
      } else {
        throw e;
      }
    }

    if (this.game.winner()) {
      var winnerMsg = $("<h2></h2>")
                        .text("You win, " + this.game.winner() + "!")
                        .addClass("winner-msg");
      this.$el.append(winnerMsg);
      this.$grid.off();
    }
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
