/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('project', {
    id: 'id',
    user_id: { type: 'integer' },
    name: { type: 'varchar(255)' },
    isdone: { type: 'boolean' },
    date: { type: 'varchar(255)', notNull: true }

  });

};

exports.down = (pgm) => {
  pgm.dropTable('project', { ifExist: true })
};
