var Player = require('./player');
var Table = require('./table');

class Game {
    player1 = null;
    player2 = null;
    table = null;

    constructor(data) {
        // TODO: move from game class
        this.player1 = new Player(data.player1, data.trump);
        this.player2 = new Player(data.player2, data.trump);

        this.table = new Table(data.trump);
    }

    run() {
        // while(this.player1.hasCards() && this.player2.hasCards()) {

        // }

        this.table.addAttackCards(this.player1.attack());
        var defenseCards = this.player2.defense(this.table.getAttackCards());
        this.table.addDefenseCards(defenseCards);

        if (this.table.allCardsCovered()) {
            var attackCards = this.player1.attack(this.table.getDefenseCards());
            this.table.moveAllCoveredCards();
            this.table.addAttackCards(attackCards);

            var defenseCards = this.player2.defense(this.table.getAttackCards());
            this.table.addDefenseCards(defenseCards);
        } else {
            console.log('loose');
        }
    }
}

module.exports = Game;