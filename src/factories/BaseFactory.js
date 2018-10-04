/* Include dependencies */
import { APIError } from 'lib/errors';
import { USER_NOT_FOUND_ERROR } from 'constants';

export class BaseFactory {

  constructor( model ) {
      this.model = model;
  }

  async findResources( query, offset = 0, limit = 10 ) {
    return await this.model.query().where( query ).offset( offset ).limit( limit );
  }

  /* Return a user by ID */
  async getResourceByID( id ) {
    /**
     * Attempt to get the user with the specified ID
     * We've wrapped this call in a try catch to catch any errors relating
     * to an invalid ID format. This could probably be done better to only
     * catch that specific error but it'll do for now.
     */
    try {
      const resource = await this.model.query().findOne({ id });

      /* If the user doesn't exist throw an error */
      if ( !resource ) {
        throw new APIError( 404, USER_NOT_FOUND_ERROR );
      }

      return resource;
    } catch ( e ) {
      /**
       * We've caught some other sort of error (most likely invalid ID format)
       * throw an error.
       */
      throw new APIError( 404, USER_NOT_FOUND_ERROR );
    }
  }
}

export default BaseFactory;
