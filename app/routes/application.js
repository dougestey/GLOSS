import Route from '@ember/routing/route';
import { hash } from 'rsvp';
// const { NotFoundError, UnauthorizedError } = DS;

export default Route.extend({

  model() {
    return hash({
      notifications: this.store.peekAll('notification')
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
