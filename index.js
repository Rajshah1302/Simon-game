var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "green", "blue", "yellow"];
var randomChosenColour;


var level = 0;
var clicks = 0;
var flag = 0;
var animationInProgress = false; // Variable to track ongoing animation

function nextSequence() {
  if (animationInProgress) {
    return; // Return early if animation is ongoing
  }

  animationInProgress = true; // Mark animation as in progress

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100, function () {
    animationInProgress = false; // Mark animation as complete when finished
  });

}

$(".btn").click(function () {
  if (animationInProgress) {
    return; // Return early if animation is ongoing
  }

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  clicks++;

  if (clicks === level) {
    checkAnswer();
  }
});

// Rest of your code remains the same


function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name) {
  $("." + name).addClass("pressed");
  setTimeout(function () {
    $("." + name).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function (params) {
  if (flag === 0) {
    game();
    flag++;
    $(".play").hide();
  }
});

$(".play").on("click", function (params) {
  if (flag === 0) {
    game();
    flag++;
    $(".play").hide();
  }
})

function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over");
      flag = 0;
      level = 0;
      $(".play").show();
      return; // Exit the function early on wrong answer
    }
  }

  if (userClickedPattern.length === level) {
    // The user's sequence matches the game pattern
    userClickedPattern = [];
    setTimeout(function () {
      game();
    }, 1000); // Delay before starting the next level
  }
}

function game() {
  userClickedPattern = [];
  gamePattern = [];
  level++;
  clicks = 0;
  $("h1").text("Level " + level);

  // Adding a delay between each iteration of the for loop
  for (var i = 0; i < level; i++) {
    setTimeout(function () {
      nextSequence();
    }, i * 500); // Adjust the delay time (500 milliseconds in this case)
  }
}
