/* Include dependencies */
import config from 'config';
import knex from 'knex';
import { Model, AjvValidator } from 'objection';

const database = knex( config.database );

Model.knex( database );

/* Export the objection instance so it can be used easily */
export default database;
export { Model, AjvValidator };
