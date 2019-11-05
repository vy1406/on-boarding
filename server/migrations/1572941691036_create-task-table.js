/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.createTable('task', {
    id: 'id',
    description: { type: 'varchar(255)' },
    project_id: { type: 'integer' },
    isdone: { type: 'boolean' },
    date: { type: 'varchar(255)'}

  });

};

exports.down = (pgm) => {
  pgm.dropTable('task', { ifExist: true })
};
