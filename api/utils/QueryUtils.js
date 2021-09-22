const selectOneByFilter = (knex, tableFrom, filter, fields = []) => {
  return knex
    .select(fields)
    .from(tableFrom)
    .where(filter)
    .first();
}

const selectAll = (knex, tableFrom, fields = []) => {
  return knex
    .select(fields)
    .from(tableFrom);
}

const selectCountByFilter = (knex, tableFrom, filter) => {
  return knex(tableFrom)
    .count('id', { as: 'counter' })
    .where(filter)
    .first()
    ?.counter;
}

const selectCountByFilterExtra = (knex, tableFrom, filter, filterExtra = []) => {
  return knex(tableFrom)
    .count('id', { as: 'counter' })
    .where(filter)
    .andWhere(filterExtra)
    .first()
    ?.counter;
}

module.exports = {
  selectOneByFilter,
  selectAll,
  selectCountByFilter,
  selectCountByFilterExtra,
};
