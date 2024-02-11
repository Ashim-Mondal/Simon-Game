let buttonsColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSounds(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// /1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSounds("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);

  let randomChosenColour = buttonsColours[randomNumber];
  // console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}
// nextSequence();

function animatePress(currentColour) {
  let document = $("#" + currentColour);
  document.addClass("pressed");
  setTimeout(() => {
    document.removeClass("pressed");
  }, 100);
}
