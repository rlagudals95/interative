import { Ball } from "./ball.js";
import { Block } from "./block.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
    this.block = new Block(700, 30, 300, 450);
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    // 레티나 디스플레이에서 선명하게 보이게 하려고 두배로 설정했어요.
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    // 애니메이션은 뭔가를 계속 생성하는 것이므로 이전에 그려진 공을 지워줘야 굵은 선처럼 보이는 현상을 방지할 수 있음
    // 공이 움직이는 것 처럼 보이지만 이전 그림과 다음 그림을 번갈아 가면서 보여주는 것임
    this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);

    this.block.draw(this.ctx)
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }
}

window.onload = () => {
  new App();
};
