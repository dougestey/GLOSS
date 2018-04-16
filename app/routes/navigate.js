import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Route.extend({

  session: service(),

  user: reads('session.user'),

  model() {
    return this.get('user');
  }

});
