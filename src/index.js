/* Include dependencies */
import { UserFactory } from 'factories';

/* Include all of the routes */
import Routes from 'routes';

/* Run any loading required */
Routes.load();

/* Create any default users */
UserFactory.createDefaultUsers();
