
module.exports = {
  profile(_, { id }, context) {
    return context.knex
      .select()
      .from('profiles')
      .where({ id })
      .first();
  },

  profiles(obj, args, context) {
    return context.knex
      .select()
      .from('profiles');
  },

  // randomUniqueNumbers() {
  //   const [min, max] = [10, 100];
  //   const numbers = arrayMathUtils.buildRandomArr(10, min, max);
  //   return arrayMathUtils.crescentSort(numbers);
  // },
};
