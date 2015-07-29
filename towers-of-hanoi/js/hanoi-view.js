(function () {
  if (typeof Hanoi === 'undefined') {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.selectedTowerIdx;

    $('.tower').on('click', this.clickTower.bind(this));
  };

  View.prototype.setupTowers = function () {
    for (var i = 0; i < 3; i++) {
      var $tower = $('<div></div>').addClass('tower');

      for (var j = 0; j < 3; j++) {
        var $space = $('<div></div>').addClass("disc-space");
        $tower.append($space);
      }

      this.$el.append($tower);
    }

    this.render();
  };

  View.prototype.render = function () {
    var self = this;
    $(".disc-space").removeClass("disc");
    this.game.towers.forEach(function(tower, towerIdx) {
      tower.forEach(function (disc, discIdx) {
        var $discEl = self.$el.children().eq(towerIdx).children().eq(2 - discIdx);
        $discEl.addClass("disc").css("width", disc * 20 + "px");
        $discEl.css("bottom", (discIdx * 10) + "px");
      });
    });
  };

  View.prototype.clickTower = function (event) {
    var $tower = $(event.currentTarget);
    var currentTowerIdx = $tower.parent().children().index($tower);

    if (this.selectedTowerIdx !== undefined) {
      this.game.move(this.selectedTowerIdx, currentTowerIdx);
      $(".tower").eq(this.selectedTowerIdx).removeClass("selected-tower");
      this.selectedTowerIdx = undefined;
    } else {
      this.selectedTowerIdx = currentTowerIdx;
      $(".tower").eq(this.selectedTowerIdx).addClass("selected-tower");
    }
    console.log(this.selectedTowerIdx);

    this.render();
  };
})();
