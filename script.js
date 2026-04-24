// --- AUDIO SYNTH API (10 PTS) ---
// Creates a retro 8-bit beep when buttons are clicked!
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(freq = 440, type = 'square', duration = 0.1) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = freq;
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

// Attach sound to EVERY button!
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('mousedown', () => playBeep(Math.random() * 400 + 400, 'square', 0.1));
});

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

// --- BIO EASTER EGG ---
document.getElementById('bio-secret').addEventListener('click', () => {
  playBeep(200, 'sawtooth', 0.5);
  alert("FATAL ERROR: MAINFRAME BREACH!\n\nTop Secret Teacher Gossip:\nBig Feliz's real first name is... MARGARET! Don't tell Coach Beef!");
});

// --- MULTIPLE DATA APIs (10 PTS) ---

// 1. Advice API
async function fetchAdvice() {
  const container = document.getElementById('advice-api-content');
  container.innerHTML = '<p class="blink">THINKING...</p>';
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    container.innerHTML = `<em>"${data.slip.advice}"</em>`;
  } catch (e) { container.innerHTML = '<p style="color: red;">ERROR: BRAIN OFFLINE</p>'; }
}

// 2. Random Meal API
async function fetchDailySpecial() {
  const container = document.getElementById('daily-special-content');
  container.innerHTML = '<p class="blink">LOADING...</p>';
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const meal = (await response.json()).meals[0];
    container.innerHTML = `<h3>${meal.strMeal}</h3><p><em>${meal.strCategory}</em></p><img src="${meal.strMealThumb}" alt="meal"><br><a href="${meal.strSource || '#'}" target="_blank" style="color: blue;">VIEW RECIPE</a>`;
  } catch (e) { container.innerHTML = '<p style="color: red;">ERROR 404</p>'; }
}

// 3. Category Search API (No more repetitive burgers!)
async function fetchCategoryRadar() {
  const container = document.getElementById('category-api-content');
  const cat = document.getElementById('food-category').value;
  container.innerHTML = '<p class="blink">SCANNING...</p>';
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const data = await response.json();
    const meals = data.meals;
    // Pick a totally random meal from the selected category array
    const rMeal = meals[Math.floor(Math.random() * meals.length)];
    container.innerHTML = `<h3>${rMeal.strMeal}</h3><img src="${rMeal.strMealThumb}" alt="food"><br><span style="color: purple; font-weight: bold;">BIG FELIZ APPROVED ${cat.toUpperCase()}!</span>`;
  } catch (e) { container.innerHTML = '<p style="color: red;">MODEM ERROR</p>'; }
}

// Init APIs
fetchAdvice(); fetchDailySpecial(); fetchCategoryRadar();
document.getElementById('new-advice-btn').addEventListener('click', fetchAdvice);
document.getElementById('new-meal-btn').addEventListener('click', fetchDailySpecial);
document.getElementById('new-category-btn').addEventListener('click', fetchCategoryRadar);

// --- QUIZ & MIDI ---
const quizQuestions = [{ q: "Chemical reaction for browned food flavor?", a: "maillard" }, { q: "Ounces in a cup?", a: "8" }];
document.getElementById('pop-quiz').addEventListener('click', () => {
  const rq = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
  let ans = prompt("POP QUIZ!\n" + rq.q);
  if (ans && ans.toLowerCase().includes(rq.a)) { 
    playBeep(880, 'sine', 0.2); setTimeout(()=>playBeep(1100, 'sine', 0.4), 200);
    alert("A+!"); document.body.style.backgroundColor = "gold"; setTimeout(()=>document.body.style.backgroundColor="#000080", 2000); 
  } else { 
    playBeep(150, 'sawtooth', 0.5);
    alert("F! See me after class."); 
  }
});
document.getElementById('play-midi').addEventListener('click', () => {
    // Play a little digital jingle!
    playBeep(261.63, 'square', 0.1); 
    setTimeout(() => playBeep(329.63, 'square', 0.1), 150);
    setTimeout(() => playBeep(392.00, 'square', 0.1), 300);
    setTimeout(() => playBeep(523.25, 'square', 0.3), 450);
});

// --- GAME 1: FEED BIG FELIZ 3D ---
const canvas = document.getElementById('game-canvas');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-game');
const diffBtns = document.querySelectorAll('.diff-btn');

let score1 = 0, gameActive1 = false, gameInterval1;
let currentBaseSpeed = 3, currentSpawnRate = 800;

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
      if (type === "bad") { score1 -= 2; player.innerHTML = '🤢'; playBeep(100, 'sawtooth', 0.2); document.body.style.backgroundColor = "green"; } 
      else if (type === "bonus") { score1 += 5; player.innerHTML = '🤩'; playBeep(800, 'sine', 0.1); document.body.style.backgroundColor = "gold"; } 
      else { score1++; player.innerHTML = '😋'; playBeep(400, 'square', 0.05); }
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
let lastHole, timeUp = false, score2 = 0;

function randomTime(min, max) { return Math.round(Math.random() * (max - min) + min); }
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) return randomHole(holes);
  lastHole = hole; return hole;
}

function peep() {
  const time = randomTime(400, 1000);
  const hole = randomHole(holes);
  const snackEl = hole.querySelector('.snack');
  
  if(Math.random() < 0.2) { snackEl.innerHTML = '⏰'; snackEl.dataset.type = 'bad'; } 
  else { const snacks = ['🍔', '🍟', '🥤', '🍩']; snackEl.innerHTML = snacks[Math.floor(Math.random() * snacks.length)]; snackEl.dataset.type = 'good'; }
  
  snackEl.classList.add('up');
  setTimeout(() => { snackEl.classList.remove('up'); if (!timeUp) peep(); }, time);
}

function startGame2() {
  scoreBoard2.textContent = 0; timeUp = false; score2 = 0;
  startBtn2.innerText = "WHACKING..."; peep();
  setTimeout(() => { timeUp = true; startBtn2.innerText = "PLAY AGAIN"; alert("RECESS IS OVER! Final Whack Score: " + score2); }, 15000); 
}

function whack(e) {
  if (!e.isTrusted || !this.classList.contains('up')) return; 
  this.classList.remove('up');
  if(this.dataset.type === 'bad') {
    score2 -= 3; playBeep(150, 'triangle', 0.2);
    document.body.style.backgroundColor = "red"; setTimeout(()=>document.body.style.backgroundColor="#000080", 200);
  } else { score2++; playBeep(600, 'square', 0.05); }
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
  box.prepend(p); e.target.reset(); alert("SAVED TO MAINFRAME!");
});
