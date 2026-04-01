// --- CURSOR TRAIL EFFECT ---
document.addEventListener('mousemove', function(e) {
  const particle = document.createElement('div');
  particle.className = 'trail-particle';
  const emojis = ['✨', '🍔', '🍟', '💫'];
  particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  particle.style.left = (e.clientX + 10) + 'px';
  particle.style.top = (e.clientY + 10) + 'px';
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 800);
});

// --- API FETCHES ---
async function fetchDailySpecial() {
  const container = document.getElementById('daily-special-content');
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const meal = (await response.json()).meals[0];
    container.innerHTML = `<h3>${meal.strMeal}</h3><p><em>${meal.strCategory}</em></p><img src="${meal.strMealThumb}" alt="meal"><br><a href="${meal.strSource || '#'}" target="_blank" style="color: blue;">VIEW RECIPE</a>`;
  } catch (e) { container.innerHTML = '<p style="color: red;">ERROR 404</p>'; }
}
async function fetchRandomBurger() {
  const container = document.getElementById('burger-api-content');
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=burger');
    const burgers = (await response.json()).meals;
    const rb = burgers[Math.floor(Math.random() * burgers.length)];
    container.innerHTML = `<h3>${rb.strMeal}</h3><img src="${rb.strMealThumb}" alt="burger"><br><span style="color: purple; font-weight: bold;">BIG FELIZ APPROVED</span>`;
  } catch (e) { container.innerHTML = '<p style="color: red;">MODEM ERROR</p>'; }
}
fetchDailySpecial(); fetchRandomBurger();
document.getElementById('new-meal-btn').addEventListener('click', fetchDailySpecial);
document.getElementById('new-burger-btn').addEventListener('click', fetchRandomBurger);

// --- QUIZ & MEATBALL & MIDI ---
const quizQuestions = [{ q: "Chemical reaction for browned food flavor?", a: "maillard" }, { q: "Ounces in a cup?", a: "8" }];
document.getElementById('pop-quiz').addEventListener('click', () => {
  const rq = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  let ans = prompt("POP QUIZ!\n" + rq.q);
  if (ans && ans.toLowerCase().includes(rq.a)) { alert("A+!"); document.body.style.backgroundColor = "gold"; setTimeout(()=>document.body.style.backgroundColor="#000080", 2000); } 
  else { alert("F! See me after class."); }
});

const meatballAnswers = ["IT IS DECIDEDLY DELICIOUS", "OUTLOOK GREASY", "ASK AGAIN AFTER LUNCH", "DON'T COUNT ON IT", "YES, BUT ADD BACON"];
document.getElementById('ask-meatball').addEventListener('click', () => {
  if (document.getElementById('meatball-question').value.trim() === "") return alert("Ask a question!");
  const display = document.getElementById('meatball-answer');
  display.innerHTML = '...';
  setTimeout(() => display.innerHTML = `<span class="meatball-answer-text">${meatballAnswers[Math.floor(Math.random() * meatballAnswers.length)]}</span>`, 1000);
});

document.getElementById('play-midi').addEventListener('click', () => alert("ERROR: Install QuickTime 4.0"));
document.getElementById('video-box').addEventListener('click', function() {
  this.style.background = "url('https://upload.wikimedia.org/wikipedia/commons/d/d3/Television_static.gif')"; this.style.backgroundSize = "cover";
  this.innerHTML = "<h2 style='background:black; color:lime; padding: 10px;'>SIGNAL LOST!</h2>";
});

// --- GAME 1: FEED BIG FELIZ 3D (WITH DIFFICULTY) ---
const canvas = document.getElementById('game-canvas');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-game');
const diffBtns = document.querySelectorAll('.diff-btn');

let score1 = 0, gameActive1 = false, gameInterval1;
let currentBaseSpeed = 3;
let currentSpawnRate = 800;

diffBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if(gameActive1) return;
    diffBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentBaseSpeed = parseFloat(e.target.dataset.speed);
    currentSpawnRate = parseInt(e.target.dataset.spawn);
  });
});

canvas.addEventListener('mousemove', (e) => {
  if (!gameActive1) return;
  let x = e.clientX - canvas.getBoundingClientRect().left - 30; 
  if (x < 0) x = 0; if (x > canvas.offsetWidth - 60) x = canvas.offsetWidth - 60;
  player.style.left = x + 'px';
});

function spawnFood() {
  if (!gameActive1) return;
  const food = document.createElement('div');
  food.className = 'food-item';
  const r = Math.random();
  let type = "good";
  if (r < 0.1) { food.innerHTML = '🌟'; type = "bonus"; } 
  else if (r < 0.3) { food.innerHTML = '🥦'; type = "bad"; } 
  else { const f = ['🍔', '🍟', '🥓', '🍕', '🌭']; food.innerHTML = f[Math.floor(Math.random() * f.length)]; }
  
  food.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
  food.style.top = '-40px';
  food.dataset.type = type;
  canvas.appendChild(food);

  let speed = currentBaseSpeed + (score1 * 0.1) + Math.random() * 2; 

  let fallInt = setInterval(() => {
    if (!gameActive1) { clearInterval(fallInt); food.remove(); return; }
    let top = parseFloat(food.style.top);
    food.style.top = (top + speed) + 'px';

    const pR = player.getBoundingClientRect(), fR = food.getBoundingClientRect();
    if (fR.bottom >= pR.top && fR.top <= pR.bottom && fR.right >= pR.left + 15 && fR.left <= pR.right - 15) {
      if (type === "bad") { score1 -= 2; player.innerHTML = '🤢'; document.body.style.backgroundColor = "green"; } 
      else if (type === "bonus") { score1 += 5; player.innerHTML = '🤩'; document.body.style.backgroundColor = "gold"; } 
      else { score1++; player.innerHTML = '😋'; }
      scoreDisplay.innerText = score1;
      setTimeout(() => { player.innerHTML = '👄'; document.body.style.backgroundColor = '#000080'; }, 300); 
      food.remove(); clearInterval(fallInt);
      if (score1 < 0) endGame1("GAME OVER! YOU ATE BROCCOLI!");
    }
    if (top > canvas.offsetHeight) { food.remove(); clearInterval(fallInt); }
  }, 20);
}

function endGame1(msg) {
  gameActive1 = false; clearInterval(gameInterval1); startBtn.innerText = "RESTART EATING!";
  document.body.style.backgroundColor = '#000080'; player.innerHTML = '😵'; alert(msg);
}

startBtn.addEventListener('click', () => {
  if (!gameActive1) {
    gameActive1 = true; score1 = 0; scoreDisplay.innerText = score1;
    startBtn.innerText = "STOP EATING!"; player.innerHTML = '👄';
    gameInterval1 = setInterval(spawnFood, currentSpawnRate);
  } else endGame1("BURGER COMA! SCORE: " + score1);
});

// --- GAME 2: WHACK-A-SNACK 3D ---
const holes = document.querySelectorAll('.hole');
const scoreBoard2 = document.getElementById('whack-score');
const startBtn2 = document.getElementById('start-whack');
let lastHole;
let timeUp = false;
let score2 = 0;
let whackTimer;

function randomTime(min, max) { return Math.round(Math.random() * (max - min) + min); }
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(400, 1000);
  const hole = randomHole(holes);
  const snackEl = hole.querySelector('.snack');
  
  // 20% chance it's an alarm clock (bad!)
  const isBad = Math.random() < 0.2;
  if(isBad) {
    snackEl.innerHTML = '⏰';
    snackEl.dataset.type = 'bad';
  } else {
    const snacks = ['🍔', '🍟', '🥤', '🍩'];
    snackEl.innerHTML = snacks[Math.floor(Math.random() * snacks.length)];
    snackEl.dataset.type = 'good';
  }
  
  snackEl.classList.add('up');
  setTimeout(() => {
    snackEl.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame2() {
  scoreBoard2.textContent = 0;
  timeUp = false;
  score2 = 0;
  startBtn2.innerText = "WHACKING...";
  peep();
  setTimeout(() => {
    timeUp = true;
    startBtn2.innerText = "PLAY AGAIN";
    alert("RECESS IS OVER! Final Whack Score: " + score2);
  }, 15000); // 15 second round
}

function whack(e) {
  if (!e.isTrusted) return; // cheater check
  if (!this.classList.contains('up')) return;
  
  this.classList.remove('up');
  
  if(this.dataset.type === 'bad') {
    score2 -= 3; // Penalty!
    document.body.style.backgroundColor = "red";
    setTimeout(()=>document.body.style.backgroundColor="#000080", 200);
  } else {
    score2++;
  }
  scoreBoard2.textContent = score2;
}

holes.forEach(hole => hole.querySelector('.snack').addEventListener('mousedown', whack));
startBtn2.addEventListener('click', () => { if(!timeUp && startBtn2.innerText === "WHACKING...") return; startGame2(); });

// GUESTBOOK
document.getElementById('guestbook-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const box = document.getElementById('guestbook-entries');
  const p = document.createElement('p');
  p.innerHTML = `<strong>${document.getElementById('gb-name').value}:</strong> ${document.getElementById('gb-message').value}`;
  box.prepend(p);
  e.target.reset();
  alert("SAVED TO MAINFRAME!");
});
