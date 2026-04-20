const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

/* =========================
   RESPONSIVE CANVAS
========================= */

canvas.width = Math.min(window.innerWidth - 40, 900)
canvas.height = 250

/* =========================
   GAME VARIABLES
========================= */

let gravity = 0.6
let velocity = 0
let jump = -12
let speed = 6

let gameOver = false
let gameStarted = false

let dino = {
x:50,
y:180,
width:44,
height:47
}

let cactus = []
let score = 0

/* =========================
   JUMP ACTION
========================= */

function jumpAction(){

if(gameOver){
location.reload()
return
}

gameStarted = true

if(dino.y >= 180){
velocity = jump
}

}

/* =========================
   DESKTOP CONTROLS
========================= */

document.addEventListener("keydown", e => {

if(e.code === "Space"){
jumpAction()
}

})

/* =========================
   MOBILE CONTROLS
   (canvas only so links work)
========================= */

canvas.addEventListener("touchstart", () => {
jumpAction()
})

/* =========================
   SPAWN CACTUS
========================= */

function spawnCactus(){

if(!gameOver){
cactus.push({
x:canvas.width,
y:190,
width:25,
height:50
})
}

}

setInterval(spawnCactus,2000)

/* =========================
   UPDATE GAME
========================= */

function update(){

if(gameOver) return

velocity += gravity
dino.y += velocity

if(dino.y > 180){
dino.y = 180
velocity = 0
}

cactus.forEach(c=>{
c.x -= speed
})

cactus = cactus.filter(c=>c.x > -50)

cactus.forEach(c=>{
if(
dino.x < c.x + c.width &&
dino.x + dino.width > c.x &&
dino.y < c.y + c.height &&
dino.y + dino.height > c.y
){
gameOver = true
}
})

score++

}

/* =========================
   DRAW GAME
========================= */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

/* Dino */

ctx.fillStyle="black"
ctx.fillRect(dino.x,dino.y,dino.width,dino.height)

/* Ground */

ctx.fillRect(0,230,canvas.width,2)

/* Cactus */

cactus.forEach(c=>{
ctx.fillRect(c.x,c.y,c.width,c.height)
})

/* Score */

ctx.font="20px monospace"
ctx.fillText("Score: "+score,canvas.width-150,40)

/* Mobile Helper */

if(!gameStarted && !gameOver){
ctx.font="18px monospace"
ctx.fillText("Tap or Press SPACE to Jump",canvas.width/2-140,120)
}

/* Game Over */

if(gameOver){

ctx.font="40px monospace"
ctx.fillText("GAME OVER",canvas.width/2-120,120)

ctx.font="18px monospace"
ctx.fillText("Tap or Press SPACE to Restart",canvas.width/2-160,160)

}

}

/* =========================
   GAME LOOP
========================= */

function gameLoop(){

update()
draw()

requestAnimationFrame(gameLoop)

}

gameLoop()