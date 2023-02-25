import { CanvasOption } from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Spark from "./js/Spark.js";
import { randomIntBetween, hypotenuse } from "./js/utils.js";
import Tail from "./js/Tail.js";

class Canvas extends CanvasOption {
  constructor() {
    super(); // 부모 클래스의 변수, 메소드를 자식 클래스에서 가져다 사용

    this.particles = [];
    this.tails = [];
    this.sparks = [];
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;

    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";
  }

  createTail() {
    // 불꽃이 화면에 잘릴 경우를 대비해 0.2 씩 곱해준다.
    const x = randomIntBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy =
      randomIntBetween(this.canvasHeight / 30, this.canvasHeight / 25) * -1;

    //const vy = randomIntBetween(15, 20)*-1;
    const colorDeg = randomIntBetween(0, 360);
    this.tails.push(new Tail(x, vy, colorDeg));
  }

  createParticles(x, y, colorDeg) {
    const PARTICLES_NUM = 1000;

    for (let i = 0; i < PARTICLES_NUM; i++) {
      // 동그랗게 퍼지는 효과를 위해 삼각함수를 통한 원형 곡선위의 좌표를 구해야함
      // r/x = cos => x = r*cos
      // y/r = sin => y = r*sin
      const r =
        randomIntBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
      const angle = (Math.PI / 180) * randomIntBetween(0, 360);
      const vx = r * Math.cos(angle); //속도
      const vy = r * Math.sin(angle); //속도
      const opacity = randomIntBetween(0.6, 0.9);
      const _colorDeg = randomIntBetween(-20, 20) + colorDeg;
      this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      //frame per second fps 동일화하기
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) {
        return;
      }

      // clearReat 대신 색을 위로 덮어 없애는 효과
      this.ctx.fillStyle = this.bgColor + "40"; // 00000040 - rgba 값에서 맨뒤 알파값처럼 취급이됨
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 배경효과
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.particles.length / 50000})`;
      this.ctx.fillRect(0,0 , this.canvasWidth, this.canvasHeight);

      if (Math.random() < 0.03) {
        this.createTail();
      }

      this.tails.forEach((tail, index) => {
        tail.update();
        tail.draw();

        // tail의 spark가 마지막엔 덜 생성되는 loop
        for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
          const vx = randomIntBetween(-5, 5) * 0.05;
          const vy = randomIntBetween(-5, 5) * 0.05;
          const opacity = Math.min(tail.y, 0.5);
          this.sparks.push(new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg));
        }

        if (tail.vy > -0.7) {
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.colorDeg);
        }
      });

      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if(Math.random() < 0.1) {
          this.sparks.push(new Spark(particle.x, particle.y, 0, 0, 0.3, 45));
        }
       
        if (particle.opacity < 0) {
          this.particles.splice(index, 1);
          // 사라진 particle은 배열에서도 제거
          // 진짜 사라졌는지 확인하려면
          // 개발자 도구 오른쪽위 ... 클릭 > more tools > performance monitor
          // cpu usage의 변화 관찰
        }
      });

      this.sparks.forEach((spark, index) => {
        spark.update();
        spark.draw();
        
        if(spark.opacity < 0){
          this.sparks.splice(index, 1);
        }
      });
      then = now - (delta % this.interval);
    };

    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});
window.addEventListener("resize", () => {
  canvas.init();
});
