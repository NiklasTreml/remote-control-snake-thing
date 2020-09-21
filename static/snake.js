var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';
document.addEventListener("keydown", change_direction)

let direction = ""

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

let gameCounter = 0
let gameScores = []

let speed = 250

let dx = 10
let dy = 0
let appleExist = false
let appleCoords = {}

let visuals = true

const toggleVisuals = function() {
    if (visuals) {
        visuals = !visuals
    } else {
        visuals = !visuals
    }

}

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

startingPointX = c.width / 2
startingPointY = c.height / 2

let snake = [{
    x: startingPointX,
    y: startingPointY
}, {
    x: startingPointX - 10,
    y: startingPointY
}, {
    x: startingPointX - 20,
    y: startingPointY
}, {
    x: startingPointX - 30,
    y: startingPointY
}, {
    x: startingPointX - 40,
    y: startingPointY
}]
var score = 0

let params = {}

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// function onDownload() {
//     const jsonData = { q: Q }
//     download(JSON.stringify(jsonData), "json-file-name.json", "text/plain");
// }

function mainGameLoop() {




    // if (gameCounter % 1000 == 0 && gameCounter != 0) {
    //     let jsonData = { q: Q_data }
    //     download(JSON.stringify(jsonData), "json-file-name.json", "text/plain")
    // }
    if (hasEnded()) {
        gameCounter++

        //console.log("Gameover")
        //console.log("Score:", score)
        if (gameCounter % 100 == 0) {
            console.log(gameCounter)
            console.log("Average of last 100 tries", average(gameScores.slice(Math.max(gameScores.length - 100, 1))))
            console.log("Average Actions before Death:", average(actions.slice(Math.max(actions.length - 100, 1))))


        }
        gameScores.push(score)

        snake = [{
            x: startingPointX,
            y: startingPointY
        }, {
            x: startingPointX - 10,
            y: startingPointY
        }, {
            x: startingPointX - 20,
            y: startingPointY
        }, {
            x: startingPointX - 30,
            y: startingPointY
        }, {
            x: startingPointX - 40,
            y: startingPointY
        }]

        score = 0
        appleExist = false
        dx = 10;
        dy = 0;

    }
    createApple()


    let compression = 2
    params = {
            playerheadx: snake[0].x / compression,
            playerheady: snake[0].y / compression,
            applex: appleCoords.x / compression,
            appley: appleCoords.y / compression,
            velx: dx,
            vely: dy,

        }
        //console.log(params)

    if (visuals) {
        clearCanvas()
        drawApple(appleCoords)
    }
    drawSnake()
    setTimeout(mainGameLoop, speed)


}
//setTimeout(mainGameLoop, speed)



function appleCollision() {
    if (snake[0].x == appleCoords.x && snake[0].y == appleCoords.y) {

        appleExist = false
        console.log("Hit apple")
        score += 10
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y })
    }
}

function drawApple(coords) {
    size = 10
    ctx.fillStyle = "red";
    ctx.fillRect(coords.x, coords.y, size, size)
    ctx.strokeRect(coords.x, coords.y, size, size);
}

function createApple() {

    if (!appleExist) {
        appleCoords = { x: 0, y: 0 };
        appleCoords.x = generateRandomNumber(0, c.width / 10) * 10;
        appleCoords.y = generateRandomNumber(0, c.height / 10) * 10;
        appleExist = true

    }

}

function hasEnded() {

    gameOver = false
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver = true
        }
    }


    if (snake[0].x > c.width || snake[0].x < 0 || snake[0].y > c.height || snake[0].y < 0) {
        gameOver = true
    }

    return gameOver
}



function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function clearCanvas() {
    //  Select the colour to fill the drawing
    ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, c.width, c.height);
    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, c.width, c.height);

}

function drawPart(part) {
    //ctx.rect(part.x, part.y, 20, 20)
    ctx.fillStyle = "green";
    ctx.fillRect(part.x, part.y, 10, 10)
    ctx.strokeRect(part.x, part.y, 10, 10);
}

function drawSnake() {

    appleCollision()
    if (visuals) {
        snake.forEach(drawPart)
    }
    moveSnake()
}

function goLeft() {
    const goingRight = dx === 10;
    direction = "left"
    if (!goingRight) {
        dx = -10;
        dy = 0;
    }
}


function goRight() {
    direction = "right"
    const goingLeft = dx === -10;
    if (!goingLeft) {
        dx = 10;
        dy = 0;
    }
}

function goUp() {
    direction = "up"
    const goingDown = dy === 10;
    if (!goingDown) {
        dx = 0;
        dy = -10;
    }
}

function goDown() {
    direction = "down"
    const goingUp = dy === -10;
    if (!goingUp) {
        dx = 0;
        dy = 10;
    }
}

function change_direction(event) {
    // const LEFT_KEY = 37;
    // const RIGHT_KEY = 39;
    // const UP_KEY = 38;
    // const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}
setTimeout(mainGameLoop, speed)