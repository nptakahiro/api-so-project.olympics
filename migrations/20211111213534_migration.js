exports.up = async function(knex) {
  await knex.schema.createTable("olygold", table => {
    table.increments();
    table.string("team");
    table.integer("gold");
  });
};

//ロールバック用
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("olygold");
};
