const { profiles } = require('../data/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  finalWage(user) {
    const taxesAndFees = 0.05;
    return (user.realWage - (user.realWage * taxesAndFees)).toFixed(2);
  },

  profile({ profileId }) {
    return profiles.filterByID(profileId);
  },
};
