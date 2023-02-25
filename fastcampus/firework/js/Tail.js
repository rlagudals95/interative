import { randomIntBetween } from "./utils.js";
import { CanvasOption } from "./CanvasOption.js";

export default class Tail extends CanvasOption {
    constructor(x, vy, colorDeg) {
      super()
      this.x = x
      this.y = this.canvasHeight
      this.vy = vy
      this.friction = 0.95
      this.colorDeg = colorDeg;
      this.radius = 5
      this.opacity = 1
      this.angle = randomIntBetween(0, 2);
    }
  
    update() {
      this.vy *= this.friction
      // 꼬리가 올라갈 수록 흐려짐
      this.opacity = -this.vy * 0.1;
 
      this.y += this.vy
      // 꼬리가 꼬불꼬불 거리는 효과
      this.angle += 1
      // 꼬불꼬불 거리는 정도도 0으로 수렴
      this.x += Math.cos(this.angle) * this.vy * 0.2
    }
  
    draw() {
      this.ctx.beginPath()
      this.ctx.fillStyle = `hsla(${this.color}, 100%, 65%, ${this.opacity})`
      this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.closePath()
    }
  }
