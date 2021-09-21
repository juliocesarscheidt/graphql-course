class ArrayMathUtils {
  constructor() {
  }

  toInt(value, base = 10) {
    return value !== undefined && !isNaN(value) ?
      parseInt(value, base) :
      0;
  }

  toFloat(value) {
    return value !== undefined && !isNaN(value) ?
      parseFloat(value).toFixed(2) :
      0.00;
  }

  randomBetween (min, max) {
    return this.toInt(Math.floor(Math.random() * (max - min + 1) + min));
  }

  crescentSort (arr) {
    return arr.sort((a, b) => a - b); // crescent order;
  }

  buildRandomArr (numbersAmount, min, max) {
    const numbers = Array(numbersAmount)
      .fill(0)
      .map(_ => this.randomBetween(min, max));

    let unique = [...new Set(numbers)];
    console.log('unique :: unique.length', unique, unique.length);

    while (unique.length !== numbersAmount) {
      const diff = (numbersAmount - unique.length);
      console.log('diff', diff);

      let newUniqueArrDiff = this.buildRandomArr(diff, min, max);
      console.log('newUniqueArrDiff', newUniqueArrDiff);

      unique = [...unique, ...newUniqueArrDiff];
      console.log('unique', unique);

      unique = [...new Set(unique)];
    }

    return unique;
  }
}

module.exports = ArrayMathUtils;
