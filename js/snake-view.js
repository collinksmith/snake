;(function() {
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var Board = Snake.Board;

  var View = Snake.View = function ($el) {
    this.$el = $el;
    this.board = new Board();
    this.snake = this.board.snake;
    $(document).keydown(this.handleKeyEvent.bind(this));
    this.interval = setInterval(this.step.bind(this), 500);
  };

  View.prototype.handleKeyEvent = function (event) {
    switch (event.keyCode) {
      case 87:  // w
        this.snake.turn('N');
        break;
      case 83:  // s
        this.snake.turn('S');
        break;
      case 65:  // a
        this.snake.turn('W');
        break;
      case 68:  // d
        this.snake.turn('E');
    }
  };

  View.prototype.step = function () {
    try {
      this.snake.move();
      this.$el.html(this.board.render());
    } catch (e) {
      console.log(e);
      if (e.name === "GameOver") {
        clearInterval(this.interval);
      } else {
        throw e;
      }
    }
  };
})();
