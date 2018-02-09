import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import Dexie from 'npm:dexie';
// const { NotFoundError, UnauthorizedError } = DS;

export default Route.extend({

  indexedDb: service(),

  beforeModel() {
    this._super(...arguments);

    return this.get('indexedDb').setup();
  },

  model() {
    return hash({
      notifications: this.store.findAll('notification')
    });
  },

  actions: {
    error(error) {
      // TODO: i.e. if (error instanceof UnauthorizedError || error instanceof NotFoundError)
      console.log(error);
      this.transitionTo('welcome');
    }
  }

});
