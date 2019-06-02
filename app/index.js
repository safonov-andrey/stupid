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
        { suite: 0, rank: 4 },
        { suite: 1, rank: 0 },
        { suite: 2, rank: 5 },
        { suite: 3, rank: 0 },
        { suite: 3, rank: 8 }
    ],
    player2: [
        { suite: 0, rank: 1 },
        { suite: 2, rank: 3 },
        { suite: 3, rank: 5 },
        { suite: 3, rank: 9 },
        { suite: 3, rank: 11 }
    ]
};

var game = new Game(data);
game.run();
