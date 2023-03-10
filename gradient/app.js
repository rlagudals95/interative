import { Glowparticle } from "./glowparticle.js";

const COLORS = [
  { r: 45, g: 74, b: 227 }, // blue
  { r: 250, g: 255, b: 89 }, // yellow
  { r: 255, g: 104, b: 248 }, // pupple
  { r: 44, g: 209, b: 252 }, // skyblue
  { r: 54, g: 233, b: 84 }, // green
];

class App {
  constructor() {

    this.parent = document.getElementById('gradient-canvas')
    if (!this.parent.hasChildNodes()) {
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      this.parent.appendChild(this.canvas)
    } else {
      this.canvas = this.parent.firstElementChild
      this.ctx = this.canvas.getContext('2d')
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    }

    this.pixelRatio = window.divicePixelRatio > 1 ? 2 : 1;

    this.totalParicles = 15;
    this.particles = [];
    this.maxRadius = 900;
    this.minRadius = 400;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    // 레티나 디스플레이 대응
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.globalCompositeOperation = "saturation";

    this.createParticles();
  }

  createParticles() {
    let curColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParicles; i++) {
      const item = new Glowparticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );

      if (++curColor >= COLORS.length) {
        curColor = 0;
      }

      this.particles[i] = item;
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParicles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}

window.onload = () => {
  new App();
};
