
/* Create the user schema */
export default {
  type: 'object',
  required: [
    'type', 'firstName', 'lastName', 'email', 'password'
  ],
  properties: {
    type: { type: String, }, /* The type of user (admin etc) */
    firstName: { type: String, }, /* The first name of the user */
    lastName: { type: String, }, /* The last name of the user */
    email: { type: String, unique: true }, /* The email address of the user */
    password: { type: String, }, /* The hash of the password of the user */
  }
};
