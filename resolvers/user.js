const { profiles } = require('../data/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  finalWage(user) {
    console.log('user.realWage', user.realWage);
    const taxesAndFees = 0.05;
    return (user.realWage - (user.realWage * taxesAndFees)).toFixed(2);
  },
  randomString() {
    return `Str ${arrayMathUtils.randomBetween(10, 100)}`;
  },
  profile({ profileId }) {
    return profiles.filterByID(profileId);
  },
};
