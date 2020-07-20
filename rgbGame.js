function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}
var blocks = document.getElementsByClassName("card");
var targetR = document.getElementById("red");
var targetG = document.getElementById("green");
var targetB = document.getElementById("blue");
var targetColor = "rgb(" + targetR.innerText + ", " + targetG.innerText + ", " + targetB.innerText + ")";
var play = true;
var res = document.getElementById("res");
var count = 0;
var chances = 3; // set count number
var score = document.getElementById("score");
var clicks = document.getElementById("clicks")
var ratio = document.getElementById("ratio");

// get an random color of target color;
function randomTarget() {
    targetR.innerText = Math.floor(Math.random() * 256);
    targetG.innerText = Math.floor(Math.random() * 256);
    targetB.innerText = Math.floor(Math.random() * 256);
    // update targetColor
    targetColor = "rgb(" + targetR.innerText + ", " + targetG.innerText + ", " + targetB.innerText + ")";
}

// add a reset button
function reset() {
    play = true;
    count = 0;
    score.innerText = 0;
    clicks.innerText = 0;
    ratio.innerText = 0
    newColors();
}

// function give new color blocks
function newColors() {
    count++;
    if (count <= chances) {
        play = true;
        document.getElementById("heading").style.background = "rgb(51, 132, 199)"; // set to original color
        randomTarget();
        res.innerText = "Let's Play!"

        for (var i = 0; i < blocks.length; i++) {
            var col = randomColor();
            blocks[i].setAttribute("style", "background-color:" + col);
        }
        // set a random block the same color as the target color
        var id = Math.floor(Math.random() * 6) // get random id between 0-5
        if (isEasy) {
            id = Math.floor(Math.random() * 3) // get random id between 0-2
        }
        blocks[id].setAttribute("style", "background-color:" + targetColor);
    }
}

// mouse event
for (var i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener("click", function() {
        // only when play is true, click is effective
        if (play) {
            // update clicks count
            clicks.innerText = Number(clicks.innerText) + 1;
            // determine whether the clicked block color is the target color
            if (this.style["background-color"] == targetColor) {
                //update the result
                play = false;
                showResult();
                res.innerText = "YOU WIN!";
                // update the score board
                score.innerText = Number(score.innerText) + 1;
                ratio.innerText = (Number(score.innerText) / (Number(clicks.innerText))).toFixed(4) * 100;
            } else {
                // when clicked the block, it disapears
                this.setAttribute("style", "display: none");
                res.innerText = "Try Again!";
            }
        }
    })
}

// when you got it right, all the blocks are showing the color
function showResult() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].setAttribute("style", "background-color:" + targetColor);
    }
    document.getElementById("heading").style.background = targetColor;
}

var hardMode = document.getElementsByClassName("hard");
var isEasy = false;

var hard = document.getElementsByClassName("row")[2];

function easyMode() {
    isEasy = true;
    hard.classList.add("noshow");
};

function makeHard() {
    isEasy = false;
    hard.classList.remove("noshow");
};