import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  ajax: service(),

  location: service(),

  model() {
    return this.get('ajax').request('/auth/whoami');
  }

});
