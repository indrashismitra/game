const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//create user paddle
const user = {
    x: 0,
    y: (canvas.height / 2) - 50,
    w: 10,
    h: 100,
    color: 'white',
    score: 0
}

//create com paddle
const com = {
    x: canvas.width - 10,
    y: (canvas.height / 2) - 50,
    w: 10,
    h: 100,
    color: 'white',
    score: 0
}

//create ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white',
}

//draw rect func
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

//create net
const net = {
    x: (canvas.width / 2) - 1,
    y: 0,
    w: 2,
    h: 10,
    color: 'white'
}

// draw net function
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.w, net.h, net.color);
    }
}

// drawRect(0, 0, canvas.width, canvas.height, '#000');

//draw circle function
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

// drawCircle(100,100,50,'#fff'); 

//draw text
function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y);
}

function drawText1(text, x, y, color){
    ctx.fillStyle = color;
    ctx.font = "20px fantasy";
    ctx.fillText(text, x, y);
}

// drawText(100, 100, 'Hello World', '#fff'); 

function render() {
    //clear canvas
    drawRect(0, 0, canvas.width, canvas.height, '#000');

    //draw net
    drawNet();

    //draw score
    // drawText1('player',canvas.width/6,4*canvas.height/5,'#fff')
    drawText(user.score,canvas.width/4,canvas.height/5,'#fff');
    drawText(com.score,3*canvas.width/4,canvas.height/5,'#fff');

    // draw user and com paddles
    drawRect(user.x, user.y, user.w, user.h, user.color); 
    drawRect(com.x, com.y, com.w, com.h, com.color);
    
    //draw ball
    drawCircle(ball.x, ball.y, ball.r, ball.color);
}

//user paddle movement
canvas.addEventListener('mousemove',movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - (user.h / 2);
}

// collision detection
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.h;
    p.left = p.x;
    p.right = p.x + p.w;

    b.top = b.y - b.r;
    b.bottom = b.y + b.r;
    b.left = b.x - b.r;
    b.right = b.x + b.r;

    return b.right > p.left && b.left < p.right && b.top < p.bottom && b.bottom > p.top;
}

//reset ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 5;
}

//update: position, movement, score etc, ...
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //simple AI to control com paddle
    let computerLevel = 0.05;
    com.y += (ball.y - (com.y + com.h / 2)) * computerLevel; 

    if(ball.y + ball.r > canvas.height || ball.y - ball.r < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width / 2) ? user : com;

    if(collision(ball, player)) {
        ball.velocityX = -ball.velocityX;
    }

    //increase speed
    ball.speed += 0.5;
    computerLevel += 0.01;

    //update score
    if(ball.x - ball.r < 0) {
        com.score++;
        resetBall();
        alert('Computer scored!');
    }
    else if(ball.x + ball.r > canvas.width) {
        user.score++;
        resetBall();
        alert('Player scored!');
    }

    //winner declaration
    if(user.score === 10) {
        alert('Player wins!');
        user.score = 0;
        com.score = 0;

    }
    else if(com.score === 10) {
        alert('Computer wins!');
        user.score = 0;
        com.score = 0;

    }
}

//game init
function game() {
    render();
}

//loop

const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);

function start() {
    const framePerSecond = 50;
    setInterval(update, 1000/framePerSecond);
}
