const screens = document.querySelectorAll(".screen");
const board = document.querySelector(".board");

const startBtn = document.getElementById("start");
const timeList = document.getElementById("time-list");
const timeEl = document.getElementById("time");

let time = 0;
let score = 0;

const colors = [
  "#d9ed92",
  "#b5e48c",
  "#99d98c",
  "#76c893",
  "#52b69a",
  "#34a0a4",
  "#168aad",
  "#1a759f",
  "#1e6091",
  "#184e77",
];

const tick = () => {
  if (time >= 0) {
    time < 10
      ? (timeEl.innerHTML = `00:0${time}`)
      : (timeEl.innerHTML = `00:${time}`);
    time--;
  } else endGame();
};

const startGame = () => {
  setInterval(tick, 1000);
  generateCircle();
};

const endGame = () => {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
};

const generateCircle = () => {
  const circle = document.createElement("div");
  const csize = rand(10, 60);

  const { height, width } = board.getBoundingClientRect();

  circle.classList.add("circle");
  circle.style.width = `${csize}px`;
  circle.style.height = `${csize}px`;

  const x = rand(csize, width - csize);
  const y = rand(csize, height - csize);

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  circle.style.backgroundColor = `${colors[rand(0, colors.length-1)]}`;

  board.append(circle);
};

const rand = (min, max) => Math.round(Math.random() * (max - min) + min);

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;

    event.target.remove();
    generateCircle();
  }
});

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = event.target.getAttribute("data-time");
    screens[1].classList.add("up");
    time = parseInt(time);
    startGame();
  }
});

// startGame();
