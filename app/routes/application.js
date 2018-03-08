import Dexie from 'npm:dexie';

import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
// const { NotFoundError, UnauthorizedError } = DS;

export default Route.extend({

  actions: {
    error(error) {
      // TODO: i.e. if (error instanceof UnauthorizedError || error instanceof NotFoundError)
      console.log(error);
      this.transitionTo('welcome');
    }
  }

});
