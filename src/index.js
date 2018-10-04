import 'source-map-support/register';
import API from 'lib/api';

/* Include dependencies */
import { UserFactory } from 'factories';

/* Include all of the routes */
import Routes from 'routes';

/* Run any loading required */
Routes.load( API );

API.start();

/* Create any default users */
UserFactory.createDefaultUsers();
