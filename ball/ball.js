export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;

    // x, y 좌표값을 움직이는 속도
    this.vx = speed;
    this.vy = speed;

    // stage에 랜덤하게 위치 시키기위한 초기함수
    const diameter = this.radius * 2;
    this.x = diameter + (Math.random() * stageWidth - diameter);
    this.y = diameter + (Math.random() * stageHeight - diameter);
  }

  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);

    this.bounceBlock(block);

    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    // 공이 바닥에 닿았다면 반대로 튀는 조건문
    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1; // 반대로 움직임
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  bounceBlock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    // 공이 블럭에 닿았다면 반대로 튀는 조건문
    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);

      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);
      if (min === min1) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (min === min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}
