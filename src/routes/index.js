/* Import dependencies */
import API from 'lib/api';
import { UserType } from 'schemas';
import {
  getApplicationInformation,
  getApplicationHealth,
  findUsers,
  getTestError,
  getUserByID,
  authenticateUser,
  getMyInformation,
  registerUser,
} from 'controllers';

class Routes {
  load() {
    /* Load all of the routes */
    API.registerRoute( 'get', '/', getApplicationInformation );
    API.registerRoute( 'get', '/health', getApplicationHealth );
    API.registerRoute( 'get', '/error/:code', getTestError );
    API.registerAuthenticatedRoute( UserType.USER, 'get', '/me', getMyInformation );
    API.registerAuthenticatedRoute( UserType.ADMIN, 'get', '/users', findUsers );
    API.registerAuthenticatedRoute( UserType.ADMIN, 'get', '/users/:id', getUserByID );
    API.registerRoute( 'post', '/auth/login', authenticateUser );
    API.registerRoute( 'post', '/auth/register', registerUser );
    /* Enable the error handler */
    API.enableErrorHandler();
  }
}

export default new Routes();
