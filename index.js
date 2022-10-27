var gameOn = true;
var waitTime = 1000
mapping = {
  0: 'green',
  1: 'red',
  2: 'blue',
  3: 'yellow'
}
var level = 0
var gamePattern = []
var userClickedPattern = []

// indicate start of the game
var first_key = true
$('body').keydown(function() {
  if (first_key) {
    nextSequence()
    first_key = false
  } else {}
})




function nextSequence() {
  $('h1').text('Level ' + String(level))
  var num = Math.floor(Math.random() * 4)
  gamePattern.push(mapping[num])
  randomChosenColour = mapping[num]
  activateButton(randomChosenColour)
  userClickedPattern = []
  level++

}


// highlight chosen button
function activateButton(randomChosenColour) {
  $("." + randomChosenColour).fadeOut(200)
  $("." + randomChosenColour).fadeIn(200)
  var aud = new Audio('sounds/' + randomChosenColour + '.mp3')
  aud.play()
}

// wClick event
$('.btn').click(function() {
  var userClickedButton = $(this).attr('id');
  userClickedPattern.push(userClickedButton)
  var aud = new Audio('sounds/' + userClickedButton + '.mp3')
  aud.play()
  buttonVisual(userClickedButton)


  var match = checkAnswer(gamePattern, userClickedPattern)

  // wrong button
  if (match === false) {
    console.log('wrong answer',gamePattern, userClickedPattern)
    $('body').addClass('game-over')
    $('h1').text('Game Over. Press Any Key to Restart')
    first_key = true
    var aud = new Audio('sounds/wrong.mp3')
    aud.play()
    setTimeout(function() {
      $('body').removeClass('game-over')
    }, 400)
    level = 0
    gamePattern = []
    userClickedPattern = []


  } else if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {nextSequence()},300)
  }
})




function checkAnswer(gamePattern, userClickedPattern) {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) return false
  }
  return true
}







function buttonVisual(userClickedButton) {

  $("." + userClickedButton).addClass('pressed')

  setTimeout
    (function() {
      $("." + userClickedButton).removeClass('pressed')
    }, 50)
}
