var Player = require('./player');

class Game {
    player1 = null;
    player2 = null;
    table = [];

    constructor(data) {
        this.player1 = new Player(data.player1, data.trump);
        this.player2 = new Player(data.player2, data.trump);
    }

    run() {
        this.player1.attack();
        // this.player2.attack();
    }
}

module.exports = Game;
