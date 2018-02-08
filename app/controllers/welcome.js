import Controller from '@ember/controller';
import { later } from '@ember/runloop';

export default Controller.extend({

  title: null,

  message: 'Booting system...',

  init() {
    this._super(...arguments);

    later(() => {
      this.set('title', 'Gloss');
    }, 1500);

    later(() => {
      this.set('loaded', true);
      this.set('message', 'System ready');
    }, 3000);

    later(() => {
      this.transitionToRoute('authorize');
    }, 5000);
  }

});
