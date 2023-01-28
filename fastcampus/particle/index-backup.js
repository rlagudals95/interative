const canvas = document.createElement("canvas");
//캔버스 작업을 할땐 캔버스 element style size와 캔버스 고유 사이즈를 맞추자

const canvasWidth = document.body.clientWidth;
const canvasHeight = document.body.clientHeight;

// devicePixelRatio 줄여서 dpr - 하나의 css pixel을 그릴때 사용되는 장치의 픽셀수
// 보통 윈도우(1dpr)는 1px에 1픽셀 맥(2dpr)은 1px에 4개의 픽셀
const dpr = window.devicePixelRatio;
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

const ctx = canvas.getContext("2d");
ctx.scale(dpr, dpr);

document.body.appendChild(canvas);

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.animate();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }

  animate() {
    // requestAnimationFrame
    // 현재 모니터 주사율을 기반으로 초당 실행 횟수가 다름 60hz = 1초에 60번 / 약 16ms 마다 실행

    // 만약 내 애니메이션의 목표가 fps = 10
    // 1초에 10번 프레임을 찍어라
    // 100ms (interval) 마다 requestAnimatinoFrame실행
    // now - requestAnimatinoFrame 실행 될 때마다 현재 시간을 나중에 가져옴
    // 즉 60hz 모니터 기준 16ms 마다 한번씩 실행이 된다
    // 현재 시간을 1000이라고 가정하고 16을 계속 더하다 보면 delta값을 넘길때가 있다. 이때 애니메이션을 동작
    // 이렇게 fps를 제어하면 모든 모니터에서 동일한 모니터에서 동일한 효과를 보여줄 수 있다

    if (delta < interval) {
      return;
    }

    //window.requestAnimationFrame(this.animate.bind(this));
    // 지워주고 다시그리기 반복
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // for (let i = 0; i < TOTAL; i++) {
    //   const x = randomNumBetween(0, stageWidth);
    //   const y = randomNumBetween(0, stageHeight);
    //   const radius = randomNumBetween(50, 100);
    //   this.draw(x, y, radius);
    // }
    this.draw();
    then = now - (delta % interval);
  }
}

// 60fps를 타겟
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

const TOTAL = 5;
const stageWidth = document.body.clientWidth;
const stageHeight = document.body.clientHeight;

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, stageWidth);
  const y = randomNumBetween(0, stageHeight);
  const radius = randomNumBetween(50, 100);

  new Particle(x, y, radius);
}
