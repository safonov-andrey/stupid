var Game = require('./components/game');
var fileParser = require('./utils/file-parser');

fileParser.getDataFromFile('./app/data/test.data.txt', dataArray => {
    var results = [];

    // var game = new Game(dataArray[47]);
    // console.log(game.run());

    dataArray.forEach(data => {
        var game = new Game(data);
        results.push(game.run());
    });
    
    var expected = '1211112121221102212111211012111211111111211211112112111112111111121211111111202222011111011111112111';
    console.log(results.join('') === expected);

    console.log(getWrongIndex(results.join(''), expected));
});

function getWrongIndex(actual, expected) {
    var wrongCount = 0;
    var firstWrong = -1;
    for (var i = 0; i < actual.length; i++) {
        if (actual.charAt(i) !== expected.charAt(i)) {
            console.log('actual = ' + actual.charAt(i));
            console.log('expected = ' + expected.charAt(i));
            wrongCount++;
            firstWrong = firstWrong === -1 ? i : firstWrong;
        }
    }
    console.log("Wrong answers: "+ wrongCount);
    return firstWrong;
}
