import Controller from '@ember/controller';
import { later } from '@ember/runloop';

export default Controller.extend({

  init() {
    later(() => {
      this.transitionToRoute('authorize');
    }, 3000);
  }

});
