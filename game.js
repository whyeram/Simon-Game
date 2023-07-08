buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
let level = 0;
let gameControl;
let checker;

function nextSequence() {
   
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


//game entry-point
$(document).keypress(function () {
    if (level === 0) {
        nextSequence();
    }
    gameControl = setInterval(function () {
        if (level > 0) {
            nextSequence();
        }
    }, 1500);

    checker = setInterval(function () {
        if (userClickedPattern.length > 0 && gamePattern.length === 0) {
            endGame();
        }
        else if (userClickedPattern.length > 0 && gamePattern.length > 0) {
            checkAnswer();
        }
    }, 100);


})
$(".btn").click(function () {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

function checkAnswer() {
    if (userClickedPattern[0] === gamePattern[0]) {
        userClickedPattern.shift();
        gamePattern.shift();
        level++; //level increases when answer correct
    }
    else {
        endGame();
    }
}

function endGame() {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
        $("body").removeClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Restart");
    }, 300);
    startOver();
    
}
function startOver(){
    clearInterval(gameControl);
    clearInterval(checker);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}