export class Sun {
  constructor() {
    this.radius = 200;

    // 원의 좌표는 60개로 나눠 고정된 값으로 처음에 저장
    this.total = 60;
    this.gap = 1 / this.total;
    this.originPos = [];
    this.pos = [];

    for (let i = 0; i < this.total; i++) {
      const pos = this.getCirclePoint(this.radius, this.gap * i);
      this.originPos[i] = pos;
      this.pos[i] = pos;
    }

    this.fps = 30;
    this.fpsTime = 1000 / this.fps;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - 140;
    this.y = this.radius + 100;
  }

  draw(ctx, t) {
    if (!this.time) {
      this.time = t;
    }

    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }

    ctx.fillStyle = "#ffb200";
    ctx.beginPath();
    let pos = this.pos[0];

    // 그냥 원그리기
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // ctx.fill();

    ctx.moveTo(pos.x + this.x, pos.y + this.y);
    for (let i = 1; i < this.total; i++) {
      const pos = this.pos[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y);
    }

    ctx.fill();
  }
  // 원위의 좌표를 가져오기 위해 sin, cos 함수를 가져오고
  // 거기에 반지름을 더하면 좌표가 나온다.
  getCirclePoint(radius, t) {
    const theta = Math.PI * 2 * t;

    return {
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius,
    };
  }
  // 태양이 지글지글 거리는 효과
  updatePoints() {
    for (let i = 1; i < this.total; i++) {
      const pos = this.originPos[i];

      this.pos[i] = {
        x: pos.x + this.ratInt(5),
        y: pos.y + this.ratInt(5),
      };
    }
  }

  ratInt(max) {
    return Math.random() * max;
  }
}
