import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('welcome', { path: '/' });
  this.route('authorize');
  this.route('navigate');
});

export default Router;
