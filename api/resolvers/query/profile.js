
module.exports = {
  profile(_, { id }, context) {
    if (context) {
      context.validateAdmin();
    }

    return context.knex
      .select()
      .from('profiles')
      .where({ id })
      .first();
  },

  profiles(_, args, context) {
    if (context) {
      context.validateAdmin();
    }

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
