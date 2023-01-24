import { Point } from "./point.js";

export class Wave {
  // 애니메이션을 만들때 중요한 것은 그리고자 하는 애니메이션의 좌표값을 가지고 오는 것입니다~!
  constructor(index, totalPoints, color) {
    // index로 웨이브를 구분해 움직임에 차이를 준다.

    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;
    // 생성할 포인트를 각각 wave마다 정의
    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = [];
    //this.point = new Point(this.centerX, this.centerY);
    // 포인트 간격 정의 - 포인트의 넓이는 총 stage에서 totalPoints 만큼 나누기
    // 정해진 간격만큼 포인트를 화면에 출력
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
      this.points[i] = point;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    // 처음과 끝 포인트는 움직이지 않는다.
    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);
    for (let i = 1; i < this.totalPoints; i++) {
      // point의 index 값을 확인하고 index가 0이거나 total -1(마지막)과 같다면 실행 x
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }
      // 포인트 선으로 연결
      // 곡선의 웨이브이므로 현재 포인트의 x,y 좌표를 그대로 적는 것이아닌
      // 이전 포인트의 x,y 좌표에 현재 포인트 x,y 좌표를 반으로 나눈 중간 값을 넣어준다.
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;
      // 곡선 그리기
      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }
}
