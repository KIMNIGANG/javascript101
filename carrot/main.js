const startBtn = document.querySelector(".btn");
const field = document.querySelector(".field");
const gameOver = document.querySelector(".gameover");

let level = 5;
let id = 0;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function bugPull() {
  var sound = document.querySelector("#bugpull");
  sound.play();
}

function carrotPull() {
  var sound = document.getElementById("carrotpull");
  sound.play();
}

function bgmStart() {
  var sound = document.getElementById("bgm");
  sound.play();
}

function create() {
  const items = document.createElement("div");
  items.setAttribute("class", "items");
  for (let i = 0; i < level; i++) {
    const bug = document.createElement("img");
    bug.setAttribute("src", "img/bug.png");
    bug.setAttribute("class", "bug");
    bug.setAttribute("onclick", "bugPull()");
    const carrot = document.createElement("img");
    carrot.setAttribute("src", "img/carrot.png");
    carrot.setAttribute("class", "carrot");
    carrot.setAttribute("data-id", id);
    carrot.setAttribute("onclick", "carrotPull()");
    items.appendChild(bug);
    items.appendChild(carrot);
    id++;
  }
  return items;
}

function move(array) {
  array.forEach((element) => {
    const randomX = getRandomArbitrary(0, 1230);
    const randomY = getRandomArbitrary(0, 280);
    element.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });
}

startBtn.addEventListener("click", () => {
  bgmStart();
  startBtn.innerHTML = `<i class="fas fa-stop"></i>`;
  const items = create();
  field.appendChild(items);
  const bugs = document.querySelectorAll(".bug");
  const carrots = document.querySelectorAll(".carrot");
  move(bugs);
  move(carrots);
  setTimeout(() => {
    gameOver.style.display = "flex";
  }, 10000);
});

field.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toDelete = document.querySelector(`.carrot[data-id="${id}"]`);
    toDelete.remove();
  }
});
