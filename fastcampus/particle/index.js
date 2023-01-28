//캔버스 작업을 할땐 캔버스 element style size와 캔버스 고유 사이즈를 맞추자
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

let canvasWidth;
let canvasHeight;
let particles;

function init() {
  canvasWidth = document.body.clientWidth;
  canvasHeight = document.body.clientHeight;

  // devicePixelRatio 줄여서 dpr - 하나의 css pixel을 그릴때 사용되는 장치의 픽셀수
  // 보통 윈도우(1dpr)는 1px에 1픽셀 맥(2dpr)은 1px에 4개의 픽셀

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  ctx.scale(dpr, dpr);

  particles = [];
  // 캔버스 크기에 따른 TOTAL 변화
  const TOTAL = canvasWidth / 10;
  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radius = randomNumBetween(20, 100);
    const vy = randomNumBetween(1, 5);
    const particle = new Particle(x, y, radius, vy);
    particles.push(particle);
  }
}

//dat gui 테스트
const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();

let gui = new dat.GUI();

const f1 = gui.addFolder("Gooey Effect"); // 효과별로 폴더 만들기
const f2 = gui.addFolder("particle properties");
f1.open();
f2.open();

f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});

f1.add(controls, "alphaChannel", 1, 200).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  ${value} ${controls.alphaOffset}`
  );
});

f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  ${controls.alphaChannel} ${value}`
  );
});

f2.add(controls, "acc", 1, 20, 0.01).onChange((value) => {
  particles.forEach((particle) => (particle.acc = value));
});

document.body.prepend(canvas);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 0.5;
  }

  update() {
    this.vy += this.acc;
    this.y += this.vy;
  }

  resize() {
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};



// 60fps를 타겟
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);

  now = Date.now();
  delta = now - then;

  if (delta < interval) {
    return;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.draw();
    particle.update();

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });
  then = now - (delta % interval);
}

window.addEventListener('load', () => {
  init();
  animate();
})
window.addEventListener('resize', () => {
  init();
})

