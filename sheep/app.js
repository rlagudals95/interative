import { Hill } from "./hill.js";
import { SheepController } from "./sheep-controller.js";
import { Sun } from "./sun.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.sun = new Sun();
    this.sheepController = new SheepController();
    this.hills = [
      new Hill("#fd6bea", 0.2, 12), // 가까워 보일 수록 speed 빠르게!
      new Hill("#ff59c2", 0.5, 8),
      new Hill("#ff4674", 1.4, 6),
    ];

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // 60FPS로 최적화 1초에 60번
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
    this.sun.resize(this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    this.sheepController.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.sun.draw(this.ctx, t);
    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx);
    }

    // FPS를 위한 타임스탬프 - t,  dots 마지막 언덕의 좌표에 양을 그림
    this.sheepController.draw(this.ctx, t, dots);
  }
}

window.onload = () => {
  new App();
};
