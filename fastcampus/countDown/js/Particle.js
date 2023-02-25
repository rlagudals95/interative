import { randomNumBetween } from "./utils.js";

export default class Particle {
  constructor(x, y) {

    this.rFriction = randomNumBetween(0.95, 1.01);
    this.rAlpha = randomNumBetween(0, 5);
    this.r = innerHeight / 4; // 대략 화면 비율에서의 반지름

    this.angleFriction =  randomNumBetween(0.97, 0.99);
    this.angleAlpha = randomNumBetween(1, 2);
    this.angle = randomNumBetween(0, 360); // 원의 테두리에 랜덤한 위치에 점을 찍기
    
    this.opacity = 1;
  }

  update() {
    this.rAlpha *= this.rFriction;
    this.r += this.rAlpha;
    
    this.angleAlpha *= this.angleFriction;
    this.angle += this.angleAlpha; // particle 시계방향으로 회전

    // 삼각 함수를 사용한 원테두리의 좌표 구하기
    this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
    this.opacity -= 0.001;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
}
