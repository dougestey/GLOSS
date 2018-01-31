import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({

  ajax: service(),

  location: service(),

  model() {
    return hash({
      character: this.get('ajax').request('/auth/whoami'),
      location: this.get('location').current()
    });
  }

});
