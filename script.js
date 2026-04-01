// --- CURSOR TRAIL EFFECT ---
document.addEventListener('mousemove', function(e) {
  const particle = document.createElement('div');
  particle.className = 'trail-particle';
  const emojis = ['✨', '🍔', '🍟', '💫'];
  particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  particle.style.left = (e.clientX + 10) + 'px';
  particle.style.top = (e.clientY + 10) + 'px';
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 800);
});

// --- API 1: FETCH A RANDOM HEALTHY MEAL (TODAY'S SPECIAL) ---
async function fetchDailySpecial() {
  const container = document.getElementById('daily-special-content');
  container.innerHTML = '<p class="blink">LOADING RECIPE MAINFRAME...</p>'; 
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const meal = data.meals[0];
    container.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <p><em>${meal.strCategory}</em></p>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <br><br>
      <a href="${meal.strSource || '#'}" target="_blank" style="color: blue;">VIEW RECIPE</a>
    `;
  } catch (error) {
    container.innerHTML = '<p style="color: red;">ERROR 404: RECIPE NOT FOUND.</p>';
  }
}

// --- API 2: THE DEDICATED FAST FOOD BURGER SCANNER (BURGER RADAR) ---
async function fetchRandomBurger() {
  const container = document.getElementById('burger-api-content');
  container.innerHTML = '<p class="blink">HACKING THE BURGER MAINFRAME...</p>'; 
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=burger');
    const data = await response.json();
    const burgers = data.meals;
    const randomBurger = burgers[Math.floor(Math.random() * burgers.length)];
    container.innerHTML = `
      <h3>${randomBurger.strMeal}</h3>
      <p><em>Origin: ${randomBurger.strArea}</em></p>
      <img src="${randomBurger.strMealThumb}" alt="${randomBurger.strMeal}">
      <br><br>
      <span style="color: purple; font-weight: bold;">100% BIG FELIZ APPROVED</span>
    `;
  } catch (error) {
    container.innerHTML = '<p style="color: red;">ERROR: GREASE IN THE MODEM.</p>';
  }
}

fetchDailySpecial();
fetchRandomBurger();
document.getElementById('new-meal-btn').addEventListener('click', fetchDailySpecial);
document.getElementById('new-burger-btn').addEventListener('click', fetchRandomBurger);

// --- EXPANDED TEACHER POP QUIZ ---
const quizQuestions = [
  { q: "What is the chemical reaction that gives browned food its distinctive flavor? (Hint: rhymes with Mallard)", a: "maillard" },
  { q: "What is the powerhouse of the cell?", a: "mitochondria" },
  { q: "How many ounces are in a standard liquid cup?", a: "8" },
  { q: "Which US State is known as the Potato Capital?", a: "idaho" },
  { q: "What fast food franchise invented the Big Mac?", a: "mcdonalds" }
];

document.getElementById('pop-quiz').addEventListener('click', () => {
  const randomQ = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  let answer = prompt("TEACHER FELIZ POP QUIZ!\n\n" + randomQ.q);
  
  if (answer && answer.toLowerCase().replace(/[^a-z0-9]/g, '').includes(randomQ.a)) {
    alert("A+! YOU GET A GOLD STAR AND EXTRA TATER TOTS!");
    document.body.style.backgroundColor = "gold";
    setTimeout(() => document.body.style.backgroundColor = "#000080", 2000);
  } else {
    alert("F! See me after class. The correct answer was related to: " + randomQ.a.toUpperCase() + "!");
  }
});

// --- MAGIC MEATBALL ---
const meatballAnswers = [
  "IT IS DECIDEDLY DELICIOUS",
  "MY SOURCES SAY EXTRA CHEESE",
  "OUTLOOK GREASY",
  "ASK AGAIN AFTER LUNCH",
  "DON'T COUNT ON IT... OR THE CALORIES",
  "YES, BUT ADD BACON",
  "SIGNS POINT TO INDIGESTION"
];

document.getElementById('ask-meatball').addEventListener('click', () => {
  const question = document.getElementById('meatball-question').value;
  const display = document.getElementById('meatball-answer');
  
  if (question.trim() === "") {
    alert("The meatball cannot read an empty plate! Ask a question!");
    return;
  }
  
  display.innerHTML = '<span style="font-size: 2rem;">...</span>'; // Loading
  setTimeout(() => {
    const randomAnswer = meatballAnswers[Math.floor(Math.random() * meatballAnswers.length)];
    display.innerHTML = `<span class="meatball-answer-text">${randomAnswer}</span>`;
  }, 1000);
});

// --- MIDI ERROR JOKE ---
document.getElementById('play-midi').addEventListener('click', () => {
  alert("ERROR 404: 'burgertime.mid' could not be loaded. Please install QuickTime Player 4.0 or contact your Webmaster.");
});

// --- FEED BIG FELIZ GAME (UPGRADED) ---
const canvas = document.getElementById('game-canvas');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-game');

let score = 0;
let gameActive = false;
let gameInterval;
let fallSpeed = 4;

canvas.addEventListener('mousemove', (e) => {
  if (!gameActive) return;
  const rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left - 30; 
  if (x < 0) x = 0;
  if (x > canvas.offsetWidth - 60) x = canvas.offsetWidth - 60;
  
  player.style.transform = `translateX(-50%) translateZ(60px)`;
  player.style.left = x + 'px';
});

function spawnFood() {
  if (!gameActive) return;
  const food = document.createElement('div');
  food.className = 'food-item';
  
  // Array of good foods, bad foods, and bonus
  const r = Math.random();
  let type = "good";
  if (r < 0.1) {
    food.innerHTML = '🌟'; // 10% chance for bonus
    type = "bonus";
  } else if (r < 0.3) {
    food.innerHTML = '🥦'; // 20% chance for bad food
    type = "bad";
  } else {
    const foods = ['🍔', '🍟', '🥓', '🍕', '🌭'];
    food.innerHTML = foods[Math.floor(Math.random() * foods.length)];
  }
  
  food.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
  food.style.top = '-40px';
  food.dataset.type = type;
  canvas.appendChild(food);

  // Speed scales up based on score
  let currentSpeed = fallSpeed + (score * 0.3) + Math.random() * 3; 

  let fallInterval = setInterval(() => {
    if (!gameActive) {
      clearInterval(fallInterval);
      food.remove();
      return;
    }

    let top = parseFloat(food.style.top);
    food.style.top = (top + currentSpeed) + 'px';

    const playerRect = player.getBoundingClientRect();
    const foodRect = food.getBoundingClientRect();

    // Collision Detection
    if (
      foodRect.bottom >= playerRect.top &&
      foodRect.top <= playerRect.bottom &&
      foodRect.right >= playerRect.left + 15 &&
      foodRect.left <= playerRect.right - 15
    ) {
      if (food.dataset.type === "bad") {
        score -= 2;
        player.innerHTML = '🤢';
        document.body.style.backgroundColor = "green";
      } else if (food.dataset.type === "bonus") {
        score += 5;
        player.innerHTML = '🤩';
        document.body.style.backgroundColor = "gold";
      } else {
        score++;
        player.innerHTML = '😋'; 
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0000'];
        document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      }

      scoreDisplay.innerText = score;
      setTimeout(() => { player.innerHTML = '👄'; document.body.style.backgroundColor = '#000080'; }, 300); 
      
      food.remove();
      clearInterval(fallInterval);

      // Check for Game Over via negative score
      if (score < 0) {
        endGame("GAME OVER! YOU ATE TOO MUCH BROCCOLI!");
      }
    }

    if (top > canvas.offsetHeight) {
      food.remove();
      clearInterval(fallInterval);
    }
  }, 20);
}

function endGame(message) {
  gameActive = false;
  clearInterval(gameInterval);
  startBtn.innerText = "RESTART GAME!";
  document.body.style.backgroundColor = '#000080';
  player.innerHTML = '😵';
  alert(message);
}

startBtn.addEventListener('click', () => {
  if (!gameActive) {
    gameActive = true;
    score = 0;
    scoreDisplay.innerText = score;
    startBtn.innerText = "STOP EATING!";
    document.body.style.backgroundColor = '#000080'; 
    player.innerHTML = '👄';
    gameInterval = setInterval(spawnFood, 600);
  } else {
    endGame("BURGER COMA! BIG FELIZ SCORED " + score + "!");
  }
});

// --- TV STATIC INTERACTION FIX ---
document.getElementById('video-box').addEventListener('click', function() {
  this.style.background = "url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Television_static.gif')";
  this.style.backgroundSize = "cover";
  this.innerHTML = "<h2 style='background:black; color:lime; padding: 10px; border: 3px dashed white; font-family: \"Comic Sans MS\", \"Marker Felt\", cursive !important;'>MUKBANG SIGNAL LOST! OM NOM NOM!</h2>";
});

// --- GUESTBOOK LOGIC ---
document.getElementById('guestbook-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('gb-name').value;
  const message = document.getElementById('gb-message').value;
  const entriesBox = document.getElementById('guestbook-entries');
  
  const newEntry = document.createElement('p');
  newEntry.innerHTML = `<strong>${name}:</strong> ${message}`;
  
  entriesBox.prepend(newEntry);
  document.getElementById('guestbook-form').reset();
  alert("YOUR MESSAGE HAS BEEN WRITTEN TO THE MAINFRAME!");
});
