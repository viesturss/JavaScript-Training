const given = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, true, false],
  [false, false, true, false, true, true, false],
  [false, false, false, true, true, false, false],
  [false, true, true, true, false, false, false],
  [true, true, false, false, false, false, false],
  [true, true, false, false, false, false, false]
];

const iter1 = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, true, true, false],
  [false, false, false, false, false, true, false],
  [false, true, false, false, false, true, false],
  [true, true, false, true, true, false, false],
  [false, false, false, false, false, false, false],
  [true, true, false, false, false, false, false]
];

const iter2 = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, true, true, false],
  [false, false, false, false, false, true, true],
  [true, true, true, false, false, true, false],
  [true, true, true, false, true, false, false],
  [false, false, true, false, false, false, false],
  [false, false, false, false, false, false, false]
];

const iter3 = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, true, true, true],
  [false, true, false, false, false, false, true],
  [true, false, true, true, true, true, true],
  [true, false, false, false, false, false, false],
  [false, false, true, true, false, false, false],
  [false, false, false, false, false, false, false]
];

const iter4 = [
  [false, false, false, false, false, true, false],
  [false, false, false, false, false, true, true],
  [false, true, true, false, false, false, false],
  [true, false, true, true, true, true, true],
  [false, false, false, false, false, true, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false]
];

const iter5 = [
  [false, false, false, false, false, true, true],
  [false, false, false, false, false, true, true],
  [false, true, true, false, false, false, false],
  [false, false, true, true, true, true, true],
  [false, false, false, true, false, true, true],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false]
];

module.exports = { given, iter1, iter2, iter3, iter4, iter5 };
