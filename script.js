const start = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector(".time-list");
const board = document.getElementById("board")
const timer = document.getElementById("time")
let color = document.getElementsByClassName("circle")
let interval = null

let time = 0;
let score = 0;

// FIRST SCREEN
start.addEventListener("click", () => {
    screens[0].classList.add("up")
});

// SECOND SCREEN
timeList.addEventListener("click", (event) => {
    if(event.target.classList.contains("time-btn")){
        time = parseInt(event.target.getAttribute("data-time"));
        screens[1].classList.add("up");
        startGame();
    };
});

board.addEventListener("click", (event) => {
    if(event.target.classList.contains("circle")) {
        score++;
        event.target.remove();
        createCircle();

    }
});

// THIRD SCREEN

function startGame() {
    interval = setInterval(descreaseTime, 1000);
    createCircle();
    setTimer(time);
}

function finishGame() {
    clearInterval(interval);
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
    timer.parentNode.innerHTML = ""
}

function descreaseTime() {
    if(time === 0 ) {
        finishGame();
    }else {
        --time;
        setTimer(time)
    }
}

function setTimer(value) {
    if(value < 10){
        timer.innerHTML = `00:0${value}`
    }else {
        timer.innerHTML = `00:${value}`
    }
}
    
function createCircle() {
    const circle = document.createElement("div")
    const size = getRandomNumber(10, 50);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = randomColors();
    
    board.append(circle);
}

function randomColors() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}
