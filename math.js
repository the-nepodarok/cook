
const randomize = (start, end, dotIndex = 0) => {

  if (start < 0 || end < 0) {
    return 'Отрицательное число!';
  }

  if (end < start) {
    [start, end] = [end, start];
  }

  let result = Math.random() * (end - start) + start;
  result = result.toFixed(dotIndex);
  return Number(result);
};

export {randomize};
