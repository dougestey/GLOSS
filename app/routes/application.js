import Route from '@ember/routing/route';
// const { NotFoundError, UnauthorizedError } = DS;

export default Route.extend({

  actions: {
    error() {
      // TODO: i.e. if (error instanceof UnauthorizedError || error instanceof NotFoundError)
      this.transitionTo('welcome');
    }
  }

});
