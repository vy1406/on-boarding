/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.sql("INSERT INTO public.user( username, password) VALUES ( 'vladimiry@spectory.com', 1234)")
  pgm.sql("INSERT INTO public.user( username, password) VALUES ( 'travalex@spectory.com', 1234)")
  pgm.sql("INSERT INTO public.user( username, password) VALUES ( 'bonda@spectory.com', 1234)")
};

exports.down = (pgm) => {

};
