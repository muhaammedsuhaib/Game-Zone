const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let paddleWidth = 100;
let paddleHeight = 20;
let paddleX = (canvas.width - paddleWidth) / 2;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = ballRadius;
let ballSpeedX = 2;
let ballSpeedY = 2;

let rightPressed = false;
let leftPressed = false;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY + ballRadius > canvas.height - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
        } else if (ballY + ballRadius > canvas.height) {
            document.location.reload();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    movePaddle();
    moveBall();
    requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

draw();
