import Route from '@ember/routing/route';
// const { NotFoundError, UnauthorizedError } = DS;

export default Route.extend({

  actions: {
    error() {
      this.transitionTo('welcome');
    }
  }

});
