import Route from '@ember/routing/route';
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
