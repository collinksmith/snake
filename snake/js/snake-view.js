;(function() {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Board = Snake.Board;

  var View = Snake.View = function ($el) {
    this.$el = $el;
    this.board = new Board();
    $(document).keydown(this.handleKeyEvent.bind(this));

    this. interval = setInterval(this.step.bind(this), 500);
  };

  View.prototype.handleKeyEvent = function (event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 87:  // w
        this.board.snake.turn('N');
        break;
      case 83:  // s
        this.board.snake.turn('S');
        break;
      case 65:  // a
        this.board.snake.turn('W');
        break;
      case 68:  // d
        this.board.snake.turn('E');
    }
  };

  View.prototype.step = function () {
    try {
      this.board.snake.move();
      this.$el.html(this.board.render());
    } catch (e) {
      if (e === "Off Board") {
        clearInterval(this.interval);
      } else {
        throw e;
      }
    }
  };

})();
