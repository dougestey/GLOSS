import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Controller.extend({

  message: service(),

  title: null,

  init() {
    this._super(...arguments);

    this.get('message').dispatch(null, 'Booting system...', 5);

    later(() => {
      this.set('title', 'Gloss');
    }, 1500);

    later(() => {
      this.get('message').dispatch(null, 'System ready');
    }, 3000);

    later(() => {
      this.transitionToRoute('authorize');
    }, 5000);
  }

});
