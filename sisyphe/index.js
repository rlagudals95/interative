import { CanvasOption } from "./js/CanvasOption.js";
import { Mountain } from "./js/Mountain.js";
import { Rock } from "./js/Rock.js";

class Canvas extends CanvasOption {
  constructor() {
    super();
  }

  init() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;

    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";

    this.mountain = new Mountain("#000");
    this.mountain.draw(this.canvasWidth, this.canvasHeight, this.ctx);
    this.rock = new Rock();
    this.rock.draw(this.ctx, 2);
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
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    };

    //requestAnimationFrame(frame);
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
