/* eslint-disable no-trailing-spaces */
'use strict';

// create userArray to store all user objects
User.userArray = [];
if (localStorage.getItem('resultsInLocalStorage')){
  getUsersFromLocalStorage();
}

function getUsersFromLocalStorage(){
  var users = JSON.parse(localStorage.getItem('resultsInLocalStorage'));
  for (var i = 0; i < users.length; i++){
    User.userArray.push(users[i]);
  }

}

// create colorArray for balloons
Balloon.colorArray = [
  { color: 'red', colorPic: 'assets/red-balloon.png', value: 'rgb(241,3,0)'},
  { color: 'blue', colorPic: 'assets/blue-balloon.png', value: 'rgb(0,70,167)'},
  { color: 'green', colorPic: 'assets/green-balloon.png', value: 'rgb(60,154,0)'},
  { color: 'yellow', colorPic: 'assets/yellow-balloon.png', value: 'rgb(254,215,0)'},
  { color: 'purple', colorPic: 'assets/purple-balloon.png', value: 'rgb(143,3,171)'},
  { color: 'pink', colorPic: 'assets/pink-balloon.png', value: 'rgb(255,0,117)'},
  { color: 'orange', colorPic: 'assets/orange-balloon.png', value: 'rgb(255,101,2)'},
  { color: 'light-blue', colorPic: 'assets/light-blue-balloon.png', value: 'rgb(0,176,228)'},
];

// create constructor for Balloons
function Balloon(index) {
  this.color = Balloon.colorArray[index].color;
  this.imageSrc = Balloon.colorArray[index].colorPic;
}

// create constructor for user
// allScores is an array of all the scores/attempts at playing the game
function User(name) {
  this.name = name;
  this.currentScore = 0;
  this.highScore = 0;
  this.allScores = [];
  User.userArray.push(this);
}

// create renderCurrentScore function
function renderCurrentScore() {
  var targetDiv = document.getElementById('game');
  var createH3 = document.createElement('h3');
  createH3.id = 'currentScore';
  createH3.innerHTML =
    'Current Score: ' + User.userArray[User.userArray.length - 1].currentScore;
  targetDiv.appendChild(createH3);
}

function popBalloon(){
  var audio = new Audio("assets/Balloon-pop.mp3");
  audio.play();
}
var playClick = document.getElementById('Play')
playClick.addEventListener('click', createForm);

function createForm() {
  var divEl = document.getElementsByTagName("BODY")[0];
  divEl.className = "body";
  var creatediv = document.createElement('div');
  creatediv.className = 'formDiv';
  creatediv.id = 'formDiv';
  var exit = document.createElement('a');
  exit.href = 'index.html';
  exit.innerHTML = 'Exit';
  exit.style.fontSize = '30px';
  creatediv.appendChild(exit);
  var divHeader = document.createElement('h1');
  divHeader.id = 'account';
  divHeader.innerHTML = 'Create an Account';
  creatediv.appendChild(divHeader);
  var createForm = document.createElement('form');
  createForm.id = 'form';
  var createInput = document.createElement('input');
  createInput.type = 'text';
  createInput.id = 'name';
  createInput.name = 'name';
  createInput.placeholder = 'UserName';
  createForm.appendChild(createInput);
  var createButton = document.createElement('input');
  createButton.id = 'play-button';
  createButton.type = 'submit';
  createButton.value = 'Play';
  createForm.appendChild(createButton);
  creatediv.appendChild(createForm);
  divEl.appendChild(creatediv);
  
  // create event listener for form
  // this will be targetting the submit/play button
  var formSubmission = document.getElementById('form');
  formSubmission.addEventListener('submit', submitHandler);
}

var leaderboard = document.getElementById('leaderboard');
leaderboard.addEventListener('click', showLeaderboard);

function showLeaderboard() {
  var divEl = document.getElementsByTagName("BODY")[0];
  divEl.className = "body";
  var creatediv = document.createElement('div');
  creatediv.className = 'formDiv';
  creatediv.id = 'formDiv';
  creatediv.style.overflowX = 'hidden';
  creatediv.style.overflowX = 'auto';
  var exit = document.createElement('a');
  exit.href = 'index.html';
  exit.innerHTML = 'Exit';
  exit.style.fontSize = '30px';
  creatediv.appendChild(exit);
  var stringResultsInStorage = JSON.parse(localStorage.getItem('resultsInLocalStorage'));
  var table = document.createElement('table');
  table.id = 'results';
  var newTrEl = document.createElement('tr');
  var newThEl = document.createElement('th');
  newThEl.textContent = 'NAME';
  newTrEl.appendChild(newThEl);
  newThEl = document.createElement('th');
  newThEl.textContent = 'SCORE';
  newTrEl.appendChild(newThEl);
  table.appendChild(newTrEl);
  
  if (localStorage.getItem('resultsInLocalStorage')){
    getUsersFromLocalStorage();
    var num = stringResultsInStorage.length -1;
    for (var j = 0; j <= num; j++){
      newTrEl = document.createElement('tr');
      var newTdEl = document.createElement('td');
      newTdEl.textContent = stringResultsInStorage[j].name;
      
      newTrEl.appendChild(newTdEl);
      newTdEl = document.createElement('td');
      newTdEl.textContent = stringResultsInStorage[j].currentScore;
      newTrEl.appendChild(newTdEl);
      table.appendChild(newTrEl);
    }
  }
  creatediv.appendChild(table);
  divEl.appendChild(creatediv);
}



// create an event handler for form
function submitHandler(event) {
  event.preventDefault();
  var body = document.getElementsByTagName('BODY')[0];
  body.className = "none";
  var userValue = document.getElementById('name');
  new User(userValue.value);
  var formDiv = document.getElementById('formDiv').remove();
  var target = document.getElementById('deleteMe');
  target.innerHTML = '';
  var createDiv = document.createElement('div');
  createDiv.id = 'game';
  createDiv.style.backgroundImage = "url('https://media.giphy.com/media/XqCKfrRcB31PG/giphy.gif')"
  target.appendChild(createDiv);
  renderCurrentScore();
  var divEl = document.getElementById('game');
  var anotherH3 = document.createElement('h3');
  anotherH3.id = 'clickAnywhere';
  anotherH3.textContent = 'Click anywhere to begin';
  divEl.appendChild(anotherH3);

  startTimer();
  startBalloons();
}

function balloonClickHandler(event) {
  
  if (event.target.id === Balloon.clickBalloon[0].color) {
    // if color === 'selected-color', add points to score
    User.userArray[User.userArray.length - 1].currentScore++;
    popBalloon();
  } else {
    // for (var i = 0; i < Balloon.colorArray.length; i++) {
      if (event.target.id !== Balloon.clickBalloon[0].color) {
        // else color !== 'selected-color', remove points from score
        User.userArray[User.userArray.length - 1].currentScore--;
        popBalloon();
      }
    // }
  }
  renderCurrentScore();
  document.getElementById('currentScore').remove();
  if (event.target.tagName === 'IMG') {
    // when balloon is clicked, remove from DOM
    event.target.remove();
  }
}

// render instructions on screen for which color balloon to click
function renderInstructions() {
  var target = document.getElementById('game');
  var h1 = document.createElement('h1');
  h1.id = 'instructions';
  h1.innerHTML = 'Click the ' + Balloon.clickBalloon[0].color + ' balloons';
  h1.style.backgroundColor = Balloon.clickBalloon[0].color;
  setInterval(function() {
    h1.style.backgroundColor = '';
  }, 1000);

  target.appendChild(h1);
}
var count = 1; 
Balloon.goodBalloonArray = [];
Balloon.clickBalloon = [];
  
function exampleFunction() { 
  Balloon.clickBalloon = [];
  Balloon.clickBalloon.push(Balloon.goodBalloonArray[Balloon.goodBalloonArray.length -1])
  console.log(Balloon.clickBalloon[Balloon.clickBalloon.length - 1].color);
  count = count + 1; 
} 

function noDelaySetInterval(func, interval) { 
  func(); 
  return setInterval(func, interval); 
} 

function startSetInterval() { 
  noDelaySetInterval(exampleFunction, 10000); 
} 

function goodBalloon(stagger){
  var randomIndex = Math.floor(Math.random() * (Balloon.colorArray.length));
  var divEl = document.getElementById('game');
  var createImg = document.createElement('img');
  var newBalloon = new Balloon(randomIndex);
  var balloonLeft = Math.floor(Math.random() * (100 - 10));
  var balloonTop = Math.floor(Math.random() + 110 + stagger);
  createImg.src = newBalloon.imageSrc;
  createImg.id = newBalloon.color;
  createImg.className = 'balloon';
  createImg.style.position = 'absolute';
  createImg.style.left = balloonLeft + '%';
  createImg.style.top = balloonTop + '%'; // min 100 px
  createImg.style.height = '100px';
  divEl.appendChild(createImg);
  // function startSetInterval() { 
              
    Balloon.goodBalloonArray.push(newBalloon)

  //   console.log(Balloon.goodBalloonArray);
      
  //   setInterval(function exampleFunction() { 
  //     Balloon.goodBalloonArray.push(newBalloon)
  //     console.log(Balloon.goodBalloonArray);
  //   }(), 10000); 
  // }

}

function badBalloon(stagger){
  var target = document.getElementById('game');
  var balloonLeft = Math.floor(Math.random() * (100 - 10));
  var balloonTop = Math.floor(Math.random() + 110 + stagger);
  var randomIndex = Math.floor(Math.random() * (Balloon.colorArray.length));
  var createImg = document.createElement('img');
  var newRandomBalloon = new Balloon(randomIndex);
  createImg.id = newRandomBalloon.color;
  createImg.className = 'balloon';
  createImg.src = newRandomBalloon.imageSrc;
  createImg.style.position = 'absolute';
  createImg.style.left = balloonLeft + '%';
  createImg.style.top = balloonTop + '%'; // min 100 px
  createImg.style.height = '100px';
  target.appendChild(createImg);

}
// create renderBalloons function
function renderBalloons() {
  stopBalloons();
  var divEl = document.getElementById('game');
  divEl.addEventListener('click', balloonClickHandler);
  //  render balloons to the page every x seconds using the increased balloon count
  var randomBalloon = 3;
  var balloonCount = 1;
  
  var stagger = 30;
  goodBalloon(stagger);
  startSetInterval();
  renderInstructions();
  balloonCount = balloonCount + 1;
  badBalloon(stagger);
  var sec = 60;
  for (var i = 0; i < randomBalloon; i++) {
    badBalloon(stagger);
  }
  randomBalloon = randomBalloon + 2;

  var balloonRender = setInterval(function () {
    for (i = 0; i < balloonCount; i++) {
      //loop for the target balloons
      goodBalloon(stagger);
      document.getElementById('instructions').remove();
      renderInstructions();
      stagger = stagger + 10;

    }
    stagger = 0;
    // balloonCount = balloonCount + 1;
    for (i = 0; i < randomBalloon; i++) {
      //loop for the target balloons
      badBalloon(stagger);
      stagger = stagger + 10;
    }
    stagger = 0;
    // randomBalloon = randomBalloon + 2;
    sec = sec - 1.5;
    if (sec < 1.5) {
      clearInterval(balloonRender);
    }
  }, 1500);
}

function startTimer() {
  var timerEvent = document.getElementById('game');
  // add event listener for starting the timer
  timerEvent.addEventListener('click', handleTimer);
}

function startBalloons() {
  var balloonEvent = document.getElementById('game');
  // addEventListener function for clicking of balloons
  balloonEvent.addEventListener('click', renderBalloons);
}
function stopBalloons() {
  document.getElementById('game').removeEventListener('click', renderBalloons);
}

function stopTimer() {
  var timerEvent = document.getElementById('game');
  timerEvent.removeEventListener('click', handleTimer);
}

function renderGif() {
  var target = document.getElementById('game');
  var createImg = document.createElement('img');
  createImg.src = "https://media.giphy.com/media/NSHwhrFyDcLY1RSkkw/source.gif";
  createImg.id = "balloon-gif";
  target.appendChild(createImg);
  setTimeout( function(){
    popBalloon();
    createImg.remove();
    var target = document.getElementById('game');
    var createImgGameOver = document.createElement('img');
    createImgGameOver.src = "https://media.giphy.com/media/1hMbkOaFfYmZvvEBq9/source.gif";
    createImgGameOver.id = "game-over-gif";
    target.appendChild(createImgGameOver);
  }, 1900);
}

//bind the timer to the event
function handleTimer(event) {
  var sec = 60;
  var timer = setInterval(function () {
    document.getElementById('timer').innerHTML =
      '00:' + sec.toString().padStart(2, '0');
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
  timerRender(timer);
}

function timerRender(interval) {
  var divEl = document.getElementById('game');
  var createH3 = document.createElement('h3');
  createH3.textContent = interval;
  createH3.id = 'timer';
  divEl.appendChild(createH3);

  var h3 = document.getElementById('clickAnywhere');
  h3.remove();
  stopTimer();
}

function endGame() {
  document.getElementById('game').innerHTML = '';
  // var createDiv = document.createElement('div');
  // var target = document.getElementById('deleteMe')
  // createDiv.id = 'game';
  // target.appendChild(createDiv);

  renderGif();
  // push currentScore into array
  User.userArray[User.userArray.length - 1].allScores.push(
    User.userArray[User.userArray.length - 1].currentScore
  );
  // store userArray array in local storage
  var stringyUserResults = JSON.stringify(User.userArray);
  localStorage.setItem('resultsInLocalStorage', stringyUserResults);

  setTimeout( function(){
    var divEl = document.getElementById('game');
    divEl.style.backgroundImage = "url('https://media.giphy.com/media/TdXZkVaakMZmU/giphy.gif')";
    // send user to results page
    showLeaderboard();
  }, 6000);
}