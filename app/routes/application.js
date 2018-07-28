import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    error(e) {
      console.log(e);
      this.transitionTo('/');
    }
  }

});
