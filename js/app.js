// variables
var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var pac_look = 4;
var start_time;
var time_elapsed;
var interval;
var winSound = new Audio("sound/pacman_win.mp3");
var boomSound = new Audio("sound/pacman_boom.wav");
var moves = 59;

// images
var mine = new Image();
var cherry = new Image();
var wall = new Image();
mine.src = "images/mine.png";
cherry.src = "images/cherry.png";
wall.src = "images/wall.png";

//Start game
start();

/*
ID's:
Food - 1
Pacman - 2
Cherry - 3
Mine - 4
Wall - 5
*/
function start() {
    board = new Array()
    score = 0;
    pac_color="yellow";
    var cnt = 70;
    var food_remain = 48;
    var cherry_remain = 11;
    var mine_remain = 10;
    var pacman_remain = 1;
    start_time= new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        for (var j = 0; j < 10; j++) {
            if ((i == 2 && j == 0) || (i == 6 && j == 0) 
            || (i == 4 && j == 1) || (i == 6 && j == 1)
            || (i == 0 && j == 2) || (i == 1 && j == 2) || (i == 2 && j == 2) || (i == 6 && j == 2) || (i == 7 && j == 2) || (i == 9 && j == 2)
            || (i == 3 && j == 4) || (i == 4 && j == 4) || (i == 6 && j == 4) || (i == 7 && j == 4)
            || (i == 1 && j == 5) || (i == 3 && j == 5) || (i == 7 && j == 5)
            || (i == 3 && j == 6) || (i == 4 && j == 6) || (i == 5 && j == 6) || (i == 6 && j == 6) || (i == 7 && j == 6)
            || (i == 0 && j == 7) || (i == 1 && j == 7) || (i == 9 && j == 7)
            || (i == 4 && j == 8) || (i == 6 && j == 8) || (i == 7 && j == 8)
            || (i == 1 && j == 9) || (i == 4 && j == 9)) {
                board[i][j] = 5;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i=i;
                    shape.j=j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else if (randomNum < 1.0 * (pacman_remain + food_remain + cherry_remain) / cnt) {
                    cherry_remain--;
                    board[i][j] = 3;
                } else if (randomNum < 1.0 * (pacman_remain + food_remain + cherry_remain + mine_remain) / cnt) {
                    mine_remain--;
                    board[i][j] = 4;
                } 
                cnt--;
            } 
        }
    }

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval=setInterval(updatePosition, 250);
}

function getKeyPressed() {
    if (keysDown[38]) { // UP
        return 1;
    } else if (keysDown[40]) { // DOWN
        return 2;
    } else if (keysDown[37]) { // LEFT
        return 3;
    } else if (keysDown[39]) { // RIGHT
        return 4;
    } else {
        return 0;
    }
}

function draw() {
    canvas.width = canvas.width;
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            var x = getKeyPressed();
            
            if (x != 0) {
                pac_look = x;
            }

            if (board[i][j] == 2) {
                if (pac_look == 1) { // UP
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y + 5, 6, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                } else if (pac_look == 2) { // DOWN
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, 2.35 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 15, center.y - 5, 6, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                } else if (pac_look == 3) { // LEFT
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 6, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                } else if (pac_look == 4) { // RIGHT
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // packman circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // eye circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                }
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // point
                context.fillStyle = "black"; //color 
                context.fill();
            } else if (board[i][j] == 3) { //Cherry
                context.drawImage(cherry, center.x - 20, center.y - 20);
            } else if (board[i][j] == 4) { // Mine
                context.drawImage(mine, center.x - 20, center.y - 20);
            } else if (board[i][j] == 5) { // Wall
                context.drawImage(wall, center.x - 20, center.y - 20);
            } 
        }
    }
}

function updatePosition() {
    board[shape.i][shape.j] = 0;
    var x = getKeyPressed();

    if(x == 1){
        if(shape.j > 0 && board[shape.i][shape.j - 1] != 5){
            shape.j--;
        }
    }

    if(x == 2){
        if(shape.j < 9 && board[shape.i][shape.j + 1] != 5){
            shape.j++;
        }
    }

    if(x == 3){
        if(shape.i > 0 && board[shape.i - 1][shape.j] != 5){
            shape.i--;
        }
    }

    if(x == 4){
        if(shape.i < 9 && board[shape.i + 1][shape.j] != 5){
            shape.i++;
        }
    }

    if (pac_color == "green"){
        if (board[shape.i][shape.j] == 1) { // Point Score
            score += 2;
            moves--;
        } else if (board[shape.i][shape.j] == 3) { // Cherry Score
            score += 5;
            moves--;
        } else if (board[shape.i][shape.j] == 4) { // Mine Score
            score -= 3;
            boomSound.play();
        }
    } else {
        if (board[shape.i][shape.j] == 1) { // Point Score
            score++;
            moves--;
        } else if (board[shape.i][shape.j] == 3) { // Cherry Score
            score += 3;
            moves--;
        } else if (board[shape.i][shape.j] == 4) { // Mine Score
            score -= 2;
            boomSound.play();
        }
    }
    
    if (score < 0){ // score cant be negative 
        score = 0;
    }

    board[shape.i][shape.j]=2;
    var currentTime = new Date();
    time_elapsed = (currentTime-start_time)/1000;

    if (score >= 20 && time_elapsed <= 10){
        pac_color = "green";
    } else {
        draw();
    }

    if (gameFinished()){
        window.clearInterval(interval);
        if (confirm("You get the highest score of " + score + "\nWant to play again?")){
            moves = 59;
            start();
        } else {
            gameOver();
        }
    }
}

function gameFinished() {
    if (moves != 0){
        return false;
    } else {
        winSound.play();
        var lastScore = lblHigh.value;
        if (score > lastScore){
            lblHigh.value = score;
            window.alert("You get the highest score of " + score + "\nYou did it in " + time_elapsed);
        } else {
            
            window.alert("You can do it better!\nYour score is " + score + "\nYou did it in " + time_elapsed);
        }
        return true;
    }
}

function gameOver() {
    windows.alert("Game Over!");
}