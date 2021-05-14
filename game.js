var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var randomChosenColor = "";
var userChosenColor = "";
var userClickedPattern = [];
var level = 0;
var checkAnswer = "";

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (userClickedPattern.length === level) {
    arraysEqual(gamePattern, userClickedPattern);

    if (checkAnswer === true) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

      return (userClickedPattern = []);
    } else {
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("h1").html(
        "Game Over," + "<br />" + "<br/>" + "Press Any Key to Restart"
      );
      startOver();
    }
  }
});

function nextSequence() {
  var randomNumber = Math.round(Math.random() * 3);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  userClickedPattern = [];
  $("#" + randomChosenColor)
    .fadeOut(300)
    .fadeIn(300);
  level++;
  playSound(randomChosenColor);
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audioPlay = new Audio("sounds/" + name + ".mp3");
  audioPlay.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).one("keydown", function () {
  nextSequence();
  userClickedPattern = [];
});

function arraysEqual(a, b) {
  if (a === b) return (checkAnswer = true);
  if (a == null || b == null) return (checkAnswer = false);
  if (a.length !== b.length) return (checkAnswer = false);

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return (checkAnswer = false);
  }
  return (checkAnswer = true);
}

function startOver() {
  level = 0;
  gamePattern = [];
  $(document).on("keydown", function () {
    location.reload();
  });
}
// for (i=0,; userClickedPattern.length < gamePattern.length; i++){

//   if (gamePattern === userClickedPattern && level === 0) {
//     nextSequence();
//   } else {
//     alert("That was incorrect");
//     setTimeout(function () {
//       location.reload();
//     }, 800);
//   }

// }

// $(document).click(function () {
//   if (randomChosenColor === "blue") {
//     $("#blue").fadeOut(100).fadeIn(100);
//   } else if (randomChosenColor === "green") {
//     $("#green").fadeOut(100).fadeIn(100);
//   } else if (randomChosenColor === "red") {
//     $("#red").fadeOut(100).fadeIn(100);
//   } else if (randomChosenColor === "yellow") {
//     $("#yellow").fadeOut(100).fadeIn(100);
//   }
// });
