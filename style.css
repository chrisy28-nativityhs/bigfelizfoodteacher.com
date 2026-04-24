/* FORCE COMIC SANS ON ABSOLUTELY EVERYTHING */
* { font-family: "Comic Sans MS", "Comic Sans", "Marker Felt", "Comic Neue", cursive !important; box-sizing: border-box; }

body { background-color: #000080; background-image: url('https://www.transparenttextures.com/patterns/stardust.png'); color: #ffff00; margin: 0; text-align: center; cursor: url('https://cur.cursors-4u.net/food/foo-1/foo3.cur'), auto; overflow-x: hidden; }

.top-marquee { background: red; color: white; padding: 5px; font-weight: bold; font-size: 24px; border-bottom: 5px dashed yellow; }

/* ANIMATION REQUIREMENT: SMOOTH TRANSITIONS ON NAV LINKS */
nav { background: yellow; padding: 15px; border: 6px ridge red; position: sticky; top: 0; z-index: 100; }
nav a { color: blue; text-decoration: none; font-weight: bold; padding: 5px 10px; font-size: 1.2rem; display: inline-block; transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, text-shadow 0.3s ease; border-radius: 5px; }
nav a:hover { background: red; color: white; transform: scale(1.15) rotate(-3deg); text-shadow: 2px 2px 5px rgba(0,0,0,0.5); }

/* ANIMATION REQUIREMENT: SMOOTH TRANSITIONS ON BUTTONS */
button { font-size: 1.2rem; padding: 10px 15px; background: yellow; color: red; border: 6px outset orange; cursor: pointer; font-weight: bold; margin-top: 10px; transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease, background-color 0.2s ease; }
button:hover { transform: scale(1.1); box-shadow: 0 0 20px lime; background-color: #fffacd; border-color: #ff00ff; }
button:active { border-style: inset; transform: scale(0.95); }

.top-btn { position: absolute; top: 50px; background: lime; color: black; font-size: 12px; border: 4px outset green; cursor: pointer; z-index: 1000; }
.midi-btn { left: 10px; }
.quiz-btn { right: 10px; background: #ff00ff; border-color: #8b008b; color: white; }

.hero { padding: 40px; border-bottom: 10px double #00ffff; background: rgba(0, 0, 0, 0.5); margin-top: 20px; }
.blink { animation: blinker 0.4s step-end infinite; font-size: 3.5rem; color: #ff00ff; text-shadow: 4px 4px #fff, -4px -4px #00ffff; margin: 0; }
@keyframes blinker { 50% { opacity: 0; } }
.sparkle-text { font-size: 2rem; color: lime; font-weight: bold; }

.trail-particle { position: fixed; pointer-events: none; font-size: 20px; z-index: 9999; animation: fadeOut 0.8s forwards; }
@keyframes fadeOut { 0% { opacity: 1; transform: scale(1) translateY(0px); } 100% { opacity: 0; transform: scale(0.5) translateY(20px); } }
@keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(20deg); } 100% { transform: translateY(0px) rotate(0deg); } }
.floater { position: fixed; font-size: 60px; z-index: 990; animation: float 3s ease-in-out infinite; pointer-events: none; }

.box { margin: 30px auto; width: 85%; max-width: 900px; padding: 25px; border: 10px ridge; }
.pink-neon { background: #ff1493; border-color: #00ffff; color: white; }
.gold-box { background: #ffd700; border-color: #ff0000; color: #000; }
.orange-crush { background: #ff4500; border-color: #000; color: white; }
.game-box { background: #8a2be2; border-color: #00ff00; color: white; }
.green-slime { background: #32cd32; border-color: #8b008b; color: #000; }
.cyan-glow { background: #00ffff; border-color: #ff00ff; color: #000; } 
.blue-dream { background: #1e90ff; border-color: yellow; color: white; }
.purple-haze { background: #4b0082; border-color: #ffff00; color: white; }

/* 3D SPINNING CUBE CSS */
.scene { width: 100px; height: 100px; perspective: 600px; margin: 30px auto; }
.cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: spinCube 4s infinite linear; }
.cube__face { position: absolute; width: 100px; height: 100px; border: 4px ridge lime; font-size: 60px; line-height: 100px; text-align: center; background: rgba(0,0,0,0.8); box-shadow: inset 0 0 20px cyan; }
.cube__face--front  { transform: rotateY(  0deg) translateZ(50px); }
.cube__face--right  { transform: rotateY( 90deg) translateZ(50px); }
.cube__face--back   { transform: rotateY(180deg) translateZ(50px); }
.cube__face--left   { transform: rotateY(-90deg) translateZ(50px); }
.cube__face--top    { transform: rotateX( 90deg) translateZ(50px); }
.cube__face--bottom { transform: rotateX(-90deg) translateZ(50px); }
@keyframes spinCube { 100% { transform: rotateY(360deg) rotateX(360deg); } }

.rainbow { background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; color: transparent; font-size: 3rem; background-color: white; }

/* BIOGRAPHY SCROLL BOX & SVG */
.svg-container { margin: 10px auto; background: rgba(0,0,0,0.3); display: inline-block; padding: 15px; border-radius: 50%; border: 4px dashed yellow; box-shadow: 0 0 15px cyan; }
.svg-container svg { animation: float 3s ease-in-out infinite; }
.bio-scrollbox { background: white; color: black; height: 250px; overflow-y: scroll; border: 8px inset #444; padding: 20px; text-align: left; font-family: "Courier New", Courier, monospace !important; font-size: 1.1rem; line-height: 1.5; }
.bio-scrollbox h3 { color: blue; border-bottom: 2px dashed red; padding-bottom: 5px; margin-top: 20px; font-family: "Courier New", Courier, monospace !important; }
.bio-scrollbox p { font-family: "Courier New", Courier, monospace !important; }

/* GAME 1 STYLES */
#difficulty-selector button { font-size: 1rem; padding: 5px 10px; margin: 0 5px; background: #ddd; color: black; border: 4px outset gray; }
#difficulty-selector button.active { background: yellow; border-color: orange; font-weight: bold; transform: scale(1.1); box-shadow: 0 0 15px orange; }
#game-canvas { width: 100%; height: 350px; background: repeating-linear-gradient(0deg, transparent, transparent 19px, lime 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, lime 20px); background-color: #111; background-size: 40px 40px; border: 8px inset #333; position: relative; overflow: hidden; margin: 15px 0; cursor: none; perspective: 600px; transform-style: preserve-3d; box-shadow: inset 0 0 50px #000; }
#player { position: absolute; bottom: 20px; font-size: 60px; left: 50%; transform: translateX(-50%) translateZ(60px); text-shadow: 0px 15px 10px rgba(0,0,0,0.8); transition: transform 0.05s ease-out; }
.food-item { position: absolute; font-size: 45px; text-shadow: 0px 20px 15px rgba(0,0,0,0.9); animation: tumble3D 1.5s linear infinite; }
@keyframes tumble3D { 0% { transform: rotateY(0deg) rotateX(0deg) translateZ(0px); } 50% { transform: rotateY(180deg) rotateX(180deg) translateZ(40px); } 100% { transform: rotateY(360deg) rotateX(360deg) translateZ(0px); } }
#score-board { color: lime; font-weight: bold; font-size: 1.5rem; position: absolute; top: 10px; left: 10px; background: black; padding: 5px; border: 3px solid white; transform: translateZ(20px); }

/* GAME 2 STYLES */
#whack-board { background: #222; border: 8px inset #555; padding: 20px; perspective: 800px; position: relative; margin: 15px auto; max-width: 600px; }
.whack-score { font-size: 1.5rem; color: cyan; background: black; border: 3px solid white; display: inline-block; padding: 5px 15px; margin-bottom: 15px; }
.whack-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; transform: rotateX(20deg); transform-style: preserve-3d; }
.hole { background: #000; border-radius: 50%; height: 100px; box-shadow: inset 0 20px 30px rgba(0,0,0,1), 0 5px 0 #444; position: relative; overflow: hidden; cursor: crosshair; }
.snack { position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%) translateZ(0); font-size: 60px; transition: all 0.2s ease-out; user-select: none; }
.snack.up { bottom: 10px; transform: translateX(-50%) translateZ(50px) scale(1.2); text-shadow: 0 10px 5px rgba(0,0,0,0.8); }

/* MISC */
.api-box { background: white; border: 5px dashed red; padding: 15px; margin: 15px auto; color: black; font-weight: bold; font-size: 1.1rem; max-width: 100%; box-shadow: inset 0 0 10px rgba(0,0,0,0.2); }
.api-box img { border: 6px ridge gold; max-width: 100%; height: auto; margin-top: 10px; }
input, textarea { width: 80%; margin: 10px; padding: 10px; font-size: 1.2rem; border: 5px inset #ccc; background: #ffffcc; }
.entries-box { background: white; color: black; border: 5px dashed blue; padding: 15px; margin-top: 20px; text-align: left; height: 150px; overflow-y: scroll; font-size: 1.2rem; }
.entries-box p { border-bottom: 2px dotted gray; padding-bottom: 5px; }
footer { background: black; color: white; padding: 20px; font-size: 1.2rem; border-top: 8px solid lime; margin-top: 40px; }
.hit-counter { margin: 20px auto; border: 5px groove gray; display: inline-block; padding: 10px; background: #222; }
.digital-font { font-size: 2rem; color: red; background: black; padding: 5px; letter-spacing: 5px; border: 2px inset #444; }
