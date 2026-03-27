// --- API INTEGRATION: FETCH A RANDOM MEAL ---
async function fetchDailySpecial() {
  const container = document.getElementById('daily-special-content');
  container.innerHTML = '<p class="blink">LOADING DATA FROM MAINFRAME...</p>'; // Loading state
  
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    
    const meal = data.meals[0];
    const mealName = meal.strMeal;
    const mealImg = meal.strMealThumb;
    const mealCategory = meal.strCategory;
    const recipeLink = meal.strSource || `https://www.youtube.com/results?search_query=${mealName} recipe`; 

    container.innerHTML = `
      <h3>${mealName}</h3>
      <p><strong>Category:</strong> ${mealCategory}</p>
      <img src="${mealImg}" alt="${mealName}">
      <br><br>
      <a href="${recipeLink}" target="_blank" style="color: blue; text-decoration: underline;">READ THE RECIPE</a>
    `;
  } catch (error) {
    container.innerHTML = '<p style="color: red;">ERROR: The cyber-kitchen is closed! Please check your modem connection.</p>';
    console.error(error);
  }
}

// Run the fetch function when the script loads
fetchDailySpecial();

// Hook up the button so users can request a new meal from the API
document.getElementById('new-meal-btn').addEventListener('click', fetchDailySpecial);


// --- MIDI ERROR JOKE ---
document.getElementById('play-midi').addEventListener('click', () => {
  alert("ERROR 404: 'burgertime.mid' could not be loaded. Please install QuickTime Player 4.0 or contact your Webmaster.");
});

// --- FEED BIG FELIZ GAME ---
const canvas = document.getElementById('game-canvas');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-game');

let score = 0;
let gameActive = false;
let gameInterval;
let fallSpeed = 4;

// Move player with mouse inside the canvas
canvas.addEventListener('mousemove', (e) => {
  if (!gameActive) return;
  const rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left - 30; 
  
  if (x < 0) x = 0;
  if (x > canvas.offsetWidth - 60) x = canvas.offsetWidth - 60;
  
  player.style.left = x + 'px';
});

function spawnFood() {
  if (!gameActive) return;
  
  const food = document.createElement('div');
  food.className = 'food-item';
  
  // Randomize food!
  const foods = ['🍔', '🍟', '🥓', '🍕', '🌭'];
  food.innerHTML = foods[Math.floor(Math.random() * foods.length)];
  
  food.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
  food.style.top = '-40px';
  canvas.appendChild(food);

  // Speed increases slightly as score goes up!
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

    // Catch collision
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
      
      // Flash the background!
      const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0000', '#000080'];
      document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }

    // Miss collision
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
  this.innerHTML = "<h2 style='background:black; color:lime; padding: 10px; border: 3px dashed white; font-family: \"Comic Sans MS\", cursive !important;'>MUKBANG SIGNAL LOST! OM NOM NOM!</h2>";
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
