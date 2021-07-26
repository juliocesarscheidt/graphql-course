const { profiles } = require('../data/datasource');

module.exports = {
  finalWage(user) {
    const taxesAndFees = 0.05;
    return (user.realWage - (user.realWage * taxesAndFees)).toFixed(2);
  },

  profile({ profileId }) {
    return profiles.filterByID(profileId);
  },
};
