// function generate random color
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}
var squares = document.getElementsByClassName("square");
var targetColor = document.getElementById("targetColor");
var corretColor;
var play = true;
var message = document.querySelector("#message");
var isEasy = false;
var h1 = document.querySelector("h1");



function assignColor() {
    // reset everything 
    play = true;
    message.textContent = "";
    h1.style.backgroundColor = ""
    playbutton.innerText = "New Colors"

    // assign target color
    corretColor = randomColor();
    targetColor.innerText = corretColor;
    // assign six squares color
    for (var i = 0; i < squares.length; i++) {
        // set all squares display
        squares[i].style.backgroundColor = randomColor();
    }
    // assign a random square the same color as target color
    var id = Math.floor(Math.random() * 6);
    if (isEasy) {
        // if it is easy mode, target square will be 0 or 1 or 2
        id = Math.floor(Math.random() * 3);
    }
    squares[id].style.backgroundColor = corretColor;
}

var playbutton = document.getElementById("playbutton");

// mouse click event
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
        // only if the play is true
        if (play) {
            if (this.style.backgroundColor == corretColor) {
                message.textContent = "You Win!"
                changeAll();
                play = false;
                playbutton.innerText = "Play Again?"
            } else {
                this.style.backgroundColor = "#232323"; // change to body color
                message.textContent = "Try again!"
            }
        }
    })
}

var easymode = document.getElementById("easymode")
var hardmode = document.getElementById("hardmode")

function easyMode() {
    isEasy = true;
    easymode.classList.add("selected")
    hardmode.classList.remove("selected")
    for (var i = 3; i < squares.length; i++) {
        squares[i].style.display = "none";
    }
    assignColor();

}

function hardMode() {
    isEasy = false;
    easymode.classList.remove("selected")
    hardmode.classList.add("selected")
    for (var i = 3; i < squares.length; i++) {
        squares[i].style.display = "";
    }
    assignColor();

}

function changeAll() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = corretColor;
    }
    h1.style.backgroundColor = corretColor;
}