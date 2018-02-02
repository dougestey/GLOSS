import DS from 'ember-data';
import Route from '@ember/routing/route';

// const { NotFoundError, UnauthorizedError } = DS;

export default Route.extend({

  actions: {
    error(error) {
      // TODO
      // if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
      //   this.controllerFor('application').set('notification', {
      //     message: 'Please sign up or log in.'
      //   });

      //   this.get('account').endSession();
      // }
      console.log(error);
      this.transitionTo('welcome');
    }
  }
});