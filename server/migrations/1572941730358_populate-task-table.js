/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

  pgm.sql("INSERT INTO public.task( description, project_id, isdone)VALUES ( 'task description 1', 1, false)")
  pgm.sql("INSERT INTO public.task( description, project_id, isdone)VALUES ( 'task description 2', 1, false)")
  pgm.sql("INSERT INTO public.task( description, project_id, isdone)VALUES ( 'task description 3', 1, true)")
  pgm.sql("INSERT INTO public.task( description, project_id, isdone)VALUES ( 'task description 4', 1, true)")
  pgm.sql("INSERT INTO public.task( description, project_id, isdone)VALUES ( 'task description 5', 1, false)")
  pgm.sql("INSERT INTO public.task( description, project_id, isdone)VALUES ( 'task description 6', 1, true)")
  pgm.sql("INSERT INTO public.task( description, project_id, isdone)VALUES ( 'task description 7', 1, false)")
};

exports.down = (pgm) => {
};
