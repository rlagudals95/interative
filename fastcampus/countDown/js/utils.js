export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

export function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

// 피타고라스의 법치을 이용해 빗변의 길이를 구하는 공식
export const hypotenuse = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
