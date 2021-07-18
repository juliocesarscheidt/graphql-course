const { profiles } = require('../data/datasource');
const MathHandler = require('../utils/MathHandler');

// init instances
const mathHandler = new MathHandler();

module.exports = {
  finalWage(user) {
    // console.log(user);
    const taxesAndFees = 0.05;
    return (user.realWage - (user.realWage * taxesAndFees)).toFixed(2);
  },
  randomString() {
    return `Str ${mathHandler.randomBetween(10, 100)}`;
  },
  profile({ profileId }) {
    return profiles.filterByID(profileId);
  },
};
