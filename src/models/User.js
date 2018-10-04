/* Include dependencies */
import jwt from 'jsonwebtoken';

import config from 'config';
import { compose, Model, AjvValidator } from 'objection';
import { UserSchema, UserType } from 'schemas';
import { APIError } from 'lib/errors';
import { INVALID_PASSWORD_ERROR } from 'constants';
import { password, guid } from './mixins';


class User extends compose( password, guid )( Model ) {
  static get tableName() {
    return 'users';
  }
  static get virtualAttributes() {
    return ['fullName', 'isAdmin'];
  }

  static get jsonSchema() {
      return UserSchema;
  }

  static get timestamps() {
    return true;
  }

  static get modelPaths() {
    return [__dirname];
  }

  static get hasToCustomValidate() {
    return false;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin() {
    return this.type === UserType.ADMIN;
  }

  generateToken() {
    /* Define the data that will be inserted into the token */
    const data = {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      type: this.type
    };

    /* Return the signed token */
    return jwt.sign( data, config.authentication.secret, { expiresIn: '365d' });
  }

  async comparePassword( password ) {
    /* Compare the password against the stored hash */
    const isValid = await this.verifyPassword( password );

    /* If the password is incorrect throw an error */
    if ( !isValid ) {
      throw new APIError( 400, INVALID_PASSWORD_ERROR );
    }
  }

  static createValidator() {
    return new AjvValidator({
      onCreateAjv: () => {},
      options: {
        $data: true,
        allErrors: true,
        validateSchema: false,
        ownProperties: true,
        v5: true,
        coerceTypes: true,
        removeAdditional: true,
      },
    });
  }

  $formatJson( json ) {
    json = super.$formatJson( json );
    json.password && delete json.password;
    return json;
  }

  $customValidate( queryContext, opts ) {
    const { jsonSchema } = this.constructor;
    jsonSchema.required = this.constructor.requiredFields( queryContext, opts );
    const validator = this.constructor.getValidator();

    const args = {
      json: this.$toJson(),
      model: this,
      options: { mutable: true },
      ctx: { jsonSchema },
    };

    validator.validate( args );
  }

  async $beforeInsert( queryContext ) {
    await super.$beforeInsert( queryContext );
    if ( this.constructor.hasToCustomValidate ) {
      this.$customValidate( queryContext, {
        isInsert: true,
      });
    }
    this.created_at = new Date();
    delete this.updated_at;
  }

  async $beforeUpdate( opts, queryContext ) {
    await super.$beforeUpdate( queryContext );
    if ( this.constructor.hasToCustomValidate && !opts.offsetValidation ) {
      this.$customValidate( queryContext, {
        isUpdate: true,
      });
    }
    this.updated_at = new Date();
    delete this.created_at;
  }
}

export default User;
