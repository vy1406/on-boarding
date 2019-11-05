/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('user', {
    id: 'id',
    username: { type: 'varchar(255)', notNull: true },
    password: { type: 'varchar(255)', notNull: true },
  });

};


exports.down = (pgm) => {
  pgm.dropTable('user', { ifExist: true })
};