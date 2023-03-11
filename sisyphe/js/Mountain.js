export class Mountain {
  constructor(color) {
    this.color = color;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.points = [];
    // 각 좌표의 x값을 total points 갯수 만큼 띄움
    // points 갯수를 딱 맟게 나누지 않고 total에서 2만큼 여유를 줘 자연스럽게 만듦
    this.gap = Math.ceil(this.stageWidth / (this.total - 2));

    for (let i = 0; i < this.total; i++) {
      this.points[i] = {
        x: i * this.gap,
        y: this.getY(),
      };
    }
  }

  draw(canvasWidth, canvasHeight, ctx) {
    console.log("draw", ctx);
    ctx.fillStyle = this.color;
    // 형 모양 그리기
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    //  ctx.lineTo(canvasWidth, canvasHeight);
    //  ctx.lineTo(0, canvasHeight);
    ctx.stroke();
    ctx.fill();
  }

  getY() {}
}
