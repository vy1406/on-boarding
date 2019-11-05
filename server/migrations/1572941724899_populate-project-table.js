/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.sql("INSERT INTO public.project( user_id, name, isdone, date) VALUES ( 1, 'project1', false, '12.10.2018')")
  pgm.sql("INSERT INTO public.project( user_id, name, isdone, date) VALUES ( 1, 'project2', false, '18.10.2019')")
  pgm.sql("INSERT INTO public.project( user_id, name, isdone, date) VALUES ( 1, 'project3', true, '31.11.2019')")
  pgm.sql("INSERT INTO public.project( user_id, name, isdone, date) VALUES ( 1, 'project4', true, '5.11.2019')")
  pgm.sql("INSERT INTO public.project( user_id, name, isdone, date) VALUES ( 1, 'project5', false, '4.11.2019')")

};

exports.down = (pgm) => {

};
