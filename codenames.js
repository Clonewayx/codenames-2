var colors = {
    RED: 0,
    BLUE: 1,
    NEUTRAL: 2,
    ASSASSIN: 3,
    DEFAULT: 4,
    NUMCOLORS: 5
};
var colorNames = ["Red", "Blue", "Neutral", "Assassin", "Default", "NumColors"];
var cssColors = ["LightCoral", "LightBlue", "Khaki", "LightSlateGray", "Cornsilk"];

var seed;
var wordList = [];
var answerList = [];
var startColor;
var gameSize = 25;

<!-- Load the updateText on first load for now -->
window.onload = function() {
    newGame();
};

function newSeed() {
    var maxGames = parseInt('zzzz', 36);
    seed = Math.floor(maxGames * Math.random()).toString(36);
}

function loadGame() {
    var loadSeed = prompt("Please enter a seed");
    var re = /[0-9a-z]{4}/;
    var match = loadSeed.match(re);
    
    if(match == null) {
        alert("'" + loadSeed + "' is not a valid seed");
    } else {
        seed = loadSeed;
        generateGame();
    }
}

function newGame() {
    newSeed();
    generateGame();
}

function generateGame() {                
    Math.seedrandom(seed);

    wordList = getRandomWordList();
    
    var answers = getAnswerList();
    answerList = answers[0];
    startColor = answers[1];
    
    document.getElementById("Text1").innerHTML = "Starting Team: ";
    document.getElementById("Text1").innerHTML += colorNames[startColor];
    document.getElementById("Text1").innerHTML += "<br />";
    document.getElementById("Text1").innerHTML += "Current Seed: " + seed;
    document.getElementById("Text1").innerHTML += "<br />";
    
    createTable();
}

function shuffleArray(array) {
    var i = array.length, temp, index;
    while (i > 0) {
        index = Math.floor(i * Math.random());
        --i;
        temp = array[index];
        array[index] = array[i];
        array[i] = temp;
    }
}

function getRandomWordList() {
    var wordSet = {}, index;
    for(var i = masterWordList.length - gameSize + 1; i <= masterWordList.length; ++i) {
        index = Math.floor(i * Math.random());
        if(wordSet[masterWordList[index]] == undefined) {
            wordSet[masterWordList[index]] = "null";
        } else {
            wordSet[masterWordList[i]] = "null";
        }
    }
    
    var wordArray = Object.keys(wordSet).sort();
    shuffleArray(wordArray);
    return wordArray;
}

function getAnswerList() {
    var startColor;
    if(Math.random() >= .5) {
        startColor = colors.RED
    } else {
        startColor = colors.BLUE
    }
    
    var answerList = [
        colors.ASSASSIN,
        colors.NEUTRAL, colors.NEUTRAL, colors.NEUTRAL, colors.NEUTRAL, colors.NEUTRAL, colors.NEUTRAL, colors.NEUTRAL,
        colors.RED, colors.RED, colors.RED, colors.RED, colors.RED, colors.RED, colors.RED, colors.RED, 
        colors.BLUE, colors.BLUE, colors.BLUE, colors.BLUE, colors.BLUE, colors.BLUE, colors.BLUE, colors.BLUE,
        startColor
    ];
    
    shuffleArray(answerList);
    
    return [answerList, startColor];
}

function createTable() {
    var tbl = document.getElementById('Table1'), tr;
    tbl.innerHTML = "";
    
    for(var i = 0; i < gameSize; ++i) {
        
        if((i % 5) == 0) {
            tr = tbl.insertRow();
        }
        var td = tr.insertCell();
        var word = wordList[i];
        var text = "<span class='txtUpsideDown'>"+ word + "</span><br /><span class='txtRightsideUp'>" + word + "</span>";
        td.innerHTML = text;
        td['class'] = "Joe";
        td.height = "60px";
        td.width = "120px";
        td.style.border = '2px solid black';
        td.style.textAlign = 'center';
        td.style.backgroundColor = cssColors[colors.DEFAULT];
        
        var color = cssColors[answerList[i]]
        
        td.onclick = (function() {
            var currentColor = color;
            return function() {
                changeColor(this, currentColor);
            }
        })();
    }
}

function changeColor(elem, color) {
    elem.style.backgroundColor = color;
    if(elem.style.color.toUpperCase() == color.toUpperCase()) {
        elem.style.color = "Black";
    } else {
        elem.style.color = color;
    }
    console.log(elem.style.class);
}

function showAnswers() {
    var tbl = document.getElementById('Table1');
    var button = document.getElementById('AnswersButton');
    var reveal;
    var color;
    
    if(button.value == "hidden") {
        reveal = true;
        button.innerHTML = "Hide Answers";
        button.value = "revealed";
    } else {
        reveal = false;
        button.innerHTML = "Show Answers";
        button.value = "hidden";
    }
    
    for (var i = 0, row; row = tbl.rows[i]; ++i) {
        for(var j = 0, cell; cell = row.cells[j]; ++j) {
            if(reveal) {
                color = cssColors[answerList[i*5+j]];
            } else {
                color = cssColors[colors.DEFAULT];
            }
            
            cell.style.backgroundColor = color;
            cell.style.color = "Black";
        }
    }
    
}
