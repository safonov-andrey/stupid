// var fs = require('fs');

// fs.readFile('./app/data/test.data.txt', 'utf8', function(err, data) {  
//     if (err) {
//         throw err;
//     }
//     // console.log(data.split('\n').join('\n------------------\n'));
// });

var play = require('./play');
var TRUMP = require('./trump.enum');
var RANK = require('./rank.enum');

var data = {
    trump: TRUMP.DIAMOND,
    player1: [
        { suit: TRUMP.DIAMOND, rank: RANK.TWO },
        { suit: TRUMP.SPADE, rank: RANK.TWO },
        { suit: TRUMP.CLUB, rank: RANK.SEVEN },
        { suit: TRUMP.HEART, rank: RANK.FIVE },
        { suit: TRUMP.SPADE, rank: RANK.TEN }
    ],
    player2: [
        { suit: TRUMP.HEART, rank: RANK.TWO },
        { suit: TRUMP.CLUB, rank: RANK.FIVE },
        { suit: TRUMP.SPADE, rank: RANK.KING },
        { suit: TRUMP.SPADE, rank: RANK.SEVEN },
        { suit: TRUMP.SPADE, rank: RANK.JACK }
    ]
};

console.log(play(data));
