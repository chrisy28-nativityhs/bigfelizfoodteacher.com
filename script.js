// --- API 1: FETCH A RANDOM HEALTHY MEAL ---
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

// --- API 2: THE DEDICATED FAST FOOD BURGER SCANNER ---
async function fetchRandomBurger() {
  const container = document.getElementById('burger-api-content');
  container.innerHTML = '<p class="blink">HACKING THE BURGER MAINFRAME...</p>'; 
  
  try {
    // We use a specific search parameter to only pull burgers from the database!
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=burger');
    const data = await response.json();
    
    // Pick a random burger from the results array
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

// Run both API fetches when the site loads
fetchDailySpecial();
fetchRandomBurger();

// Attach API buttons
document.getElementById('new-meal-btn').addEventListener('click', fetchDailySpecial);
document.getElementById('new-burger-btn').addEventListener('click', fetchRandomBurger);


// --- TEACHER POP QUIZ ---
document.getElementById('pop-quiz').addEventListener('click', () => {
  let answer = prompt("TEACHER FELIZ POP QUIZ!\nWhat is the chemical reaction that gives browned food its distinctive flavor? (Hint: It rhymes with 'Mallard')");
  
  if (answer && answer.toLowerCase().includes("maillard")) {
    alert("A+! YOU GET A GOLD STAR AND EXTRA TATER TOTS!");
    document.body.style.backgroundColor = "gold";
  } else {
    alert("F! See me after class. The answer is the Maillard Reaction!");
  }
});

// --- MIDI ERROR JOKE ---
document.getElementById('play-midi').addEventListener('click', () => {
  alert("ERROR 404: 'burgertime.mid' could not be loaded. Please install QuickTime Player 4.0 or contact your Webmaster.");
});

// --- FEED BIG FELIZ GAME (3D) ---
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
  const foods = ['🍔', '🍟', '🥓', '🍕', '🌭'];
  food.innerHTML = foods[Math.floor(Math.random() * foods.length)];
  
  food.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
  food.style.top = '-40px';
  canvas.appendChild(food);

  let currentSpeed = fallSpeed + (score * 0.2) + Math.random() * 3; 

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

    if (
      foodRect.bottom >= playerRect.top &&
      foodRect.top <= playerRect.bottom &&
      foodRect.right >= playerRect.left + 15 &&
      foodRect.left <= playerRect.right - 15
    ) {
      score++;
      scoreDisplay.innerText = score;
      player.innerHTML = '😋'; 
      setTimeout(() => player.innerHTML = '👄', 200); 
      food.remove();
      clearInterval(fallInterval);
      
      const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0000', '#000080'];
      document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }

    if (top > canvas.offsetHeight) {
      food.remove();
      clearInterval(fallInterval);
    }
  }, 20);
}

startBtn.addEventListener('click', () => {
  if (!gameActive) {
    gameActive = true;
    score = 0;
    scoreDisplay.innerText = score;
    startBtn.innerText = "STOP EATING!";
    document.body.style.backgroundColor = '#000080'; 
    gameInterval = setInterval(spawnFood, 700);
  } else {
    gameActive = false;
    clearInterval(gameInterval);
    startBtn.innerText = "RESTART GAME!";
    document.body.style.backgroundColor = '#000080';
    alert("BURGER COMA! BIG FELIZ ATE " + score + " ITEMS!");
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
