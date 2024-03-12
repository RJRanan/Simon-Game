var buttonColours = ["red", "blue", "green", "yellow"];
// var buttonColours = ["red", "blue", "green", "yellow", "purple", "orange"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var currentScore = 0;
var highscore = 0;

function startGame() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

$(document).on("click touchstart", startGame);

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();

        //add score if correct
        currentScore++;
        $("#currentScore").text("Current Score: " + currentScore);
      }, 1000);
    }
  } else {
    var wrongAnswer = new Audio("sounds/wrong.mp3");
    wrongAnswer.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    if (currentScore > highscore) {
      highscore = currentScore;
      $("#highscore").text("Highscore: " + highscore);
    }

    $("#level-title").text("Game Over, Tap to Restart.");

    setTimeout(function () {
      startOver();
    }, 1000);
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  // need to be fix
  // var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function () {
    $("#" + randomChosenColour)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColour);
  }, 200);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  setTimeout(function () {
    currentScore = 0;
    $("#currentScore").text("Current Score: " + currentScore);
    level = 0;
    gamePattern = [];
    started = false;
  }, 300);
  setTimeout(function () {
    startGame();
  }, 4000);
}
