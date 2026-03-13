const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let gravity = 0.6
let velocity = 0
let jump = -12
let speed = 6

let gameOver = false

let dino = {
x:50,
y:180,
width:44,
height:47
}

let cactus = []
let score = 0

document.addEventListener("keydown",e=>{

if(gameOver && e.code === "Space"){
location.reload()
}

if(e.code === "Space"){
if(dino.y >= 180 && !gameOver){
velocity = jump
}
}

})

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

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="black"
ctx.fillRect(dino.x,dino.y,dino.width,dino.height)

ctx.fillRect(0,230,canvas.width,2)

cactus.forEach(c=>{
ctx.fillRect(c.x,c.y,c.width,c.height)
})

ctx.font="20px monospace"
ctx.fillText("Score: "+score,canvas.width-150,40)

if(gameOver){

ctx.font="40px monospace"
ctx.fillText("GAME OVER",canvas.width/2-120,120)

ctx.font="18px monospace"
ctx.fillText("Press SPACE to restart",canvas.width/2-130,160)

}

}

function gameLoop(){

update()
draw()

requestAnimationFrame(gameLoop)

}

gameLoop()