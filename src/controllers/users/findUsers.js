/* Include dependencies */
import { UserFactory } from 'factories';
import { requireFields, withinRange } from 'utils/validation';
import { PAGINATION_MAX_USERS_LIMIT } from 'constants';

/* Returns an array of all the users (pagination) */
export default async ( req, res ) => {
  /* Get the pagination parameters */
  let { offset, limit, ...restQuery } = req.query;

  /* If either of the fields are missing throw an error */
  requireFields({ offset, limit });

  /* Convert to numbers */
  offset = parseInt( offset, 10 );
  limit = parseInt( limit, 10 );

  /* Ensure offset and limit are valid values */
  withinRange({ offset }, 0 );
  withinRange({ limit }, 0, PAGINATION_MAX_USERS_LIMIT );

  /* Get the paginated users */
  const users = await UserFactory.findUsers( restQuery, offset, limit );

  /* Get a count of all the users */
  const count = await UserFactory.getUserFindCount( restQuery );

  /* Returns the paginated users and the count of all users */
  res.json({ users, count, offset, limit });
};
