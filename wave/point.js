export class Point {
  // 일정간격을 가진 좌표들을 하나씩 만들어서
  // 좌표 값의 y를 아래위로 움직이고 각각의 y를 이어주는 선을 만든다
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = index;
    this.max = Math.random() * 100 + 150;
  }

  // 아래위로 움직임을 보여주는 함수
  update() {
    this.cur += this.speed;

    // sin 함수를 써 아래위로 움직임 연출
    // sin 함수에 일정값을 계속 추가하거나 빼면 리턴 값이 1까지 증가했다가 -1까지 감소함
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);

  }
}
