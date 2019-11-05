/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('projects', {
    id: {
      type: 'id'
    },
  })
};

exports.down = (pgm) => {
  pgm.dropTable('projects', { ifExist: true })
  // pgm.sql('')
  // pgm.db.query('')
};
