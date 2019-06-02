// var fs = require('fs');

// fs.readFile('./app/data/test.data.txt', 'utf8', function(err, data) {  
//     if (err) {
//         throw err;
//     }
//     // console.log(data.split('\n').join('\n------------------\n'));
// });

var Game = require('./components/game');
var SUITES = require('./enums/suite.enum');

var data = {
    trump: SUITES.DIAMOND,
    player1: [
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    player2: [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]
    ]
};

var game = new Game(data);
game.run();
