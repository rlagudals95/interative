export class Sheep {
  // 오른쪽 끝에서 양이 등장하므로 stageWidth를 받는다
  constructor(img, stageWidth) {
    this.img = img;

    // 프레임 정의

    this.totalFrame = 8;
    this.curFrame = 0;

    this.imgWidth = 360;
    this.imgHeight = 360;
    // 양의 크기는 레티나 디스플레이를 고려한 절반사이즈
    this.sheepWidth = 180;
    this.sheepHeight = 150;

    this.sheepWidthHalf = this.sheepWidth / 2;

    this.x = stageWidth + this.sheepWidth;
    this.y = 0;
    this.speed = Math.random() * +1;

    this.fps = 24;
    // 실제로 타임 스탬프와 비교가 됨
    this.fpsTime = 1000 / this.fps;
  }

  draw(ctx, t, dots) {
    // 현재 프레임 늘리기

    // requestAnimationFrame으로 전달받을 타임스탬프를 시간으로 정의 시간으로 내가 정의한 fps 시간과 비교
    // 매번 프레임을 증가하는게 아니라 내 fps 시간에 도달 했을 때만 증가 시킴
    // 프레임을 증가시키는 속도를 시간에 맞춰 조절

    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    // 시간에 도달 했을 때만 프레임 증가
    // 자연스러움 걸음 걸이
    if (now > this.fpsTime) {
      this.time = t;
      this.curFrame += 1;

      if (this.curFrame === this.totalFrame) {
        this.curFrame = 0;
      }
    }
    this.animate(ctx, dots);
  }

  animate(ctx, dots) {
    // 양의 x 값을 스테이지 넓이에 양의 넓이를 더한 만큼으로 지정하고 속도를 빼주면 양이 이동함
    this.x -= this.speed;

    // 촘촘하게 나눈 곡선으로 부터 가장 근사치 y값을 가져와서 자연스럽게 곡선을 넘어가는 y좌표를 구함
    const closest = this.getY(this.x, dots);

    this.y = closest.y;

    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.rotate(closest.rotation);
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      // 양을 중앙에 놓기 위해 넓이의 중간
      -this.sheepWidthHalf,
      // 이미지에서 생긴 영역만큼 지면을 자연스럽게 걷는 효과를 위해 40이라는 임의의 높이를 더해줌
      -this.sheepHeight + 40,
      // 양의 크기만큼 넓이와 높에 정의
      this.sheepWidth,
      this.sheepHeight
    );
    // 저장했던 캔버스 복귀
    ctx.restore();
  }
  // 언덕위 곡선이 하나가 아닌 여러개로 나눠져 있음
  // 우선 어떤 곡선이 x 값에 해당하는지 확인
  getY(x, dots) {
    for (let i = 1; i < dots.length; i++) {
      if (x >= dots[i].x1 && x <= dots[i].x3) {
        return this.getY2(x, dots[i]);
      }
    }

    return {
      y: 0,
      rotation: 0,
    };
  }

  // 200개의 촘촘한 비율로 곡선을 나누고
  // x 값과 가장 근사한 곡선의 좌표를 가져온다
  getY2(x, dot) {
    const total = 200;
    let pt = this.getPointOnQuad(
      dot.x1,
      dot.y1,
      dot.x2,
      dot.y2,
      dot.x3,
      dot.y3,
      0
    );
    let prevX = pt.x;
    for (let i = 1; i < total; i++) {
      const t = i / total;
      pt = this.getPointOnQuad(
        dot.x1,
        dot.y1,
        dot.x2,
        dot.y2,
        dot.x3,
        dot.y3,
        t
      );

      if (x >= prevX && x <= pt.x) {
        return pt;
      }

      prevX = pt.x;
    }
    return pt;
  }

  // 양의 y 좌표를 얻기 위해 공식참고 - https://javascript.info/bezier-curve
  getQuadValue(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }

  // 비율에 따른 좌표 찾기
  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    const tx = this.quadTangent(x1, x2, x3, t);
    const ty = this.quadTangent(y1, y2, y3, t);
    // 수직의 각도를 가져오고 수평으로 변환
    const rotation = -Math.atan2(tx, ty) + (90 * Math.PI) / 180;
    return {
      x: this.getQuadValue(x1, x2, x3, t),
      y: this.getQuadValue(y1, y2, y3, t),
      rotation,
    };
  }

  // 곡선의 기울기에 따라 양의 기울기도 움직여서 자연스러움 연출
  // 곡선위의 수직 각도를 구함
  quadTangent(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }
}
