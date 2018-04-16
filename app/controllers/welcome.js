import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Controller.extend({

  message: service(),

  title: null,

  init() {
    this._super(...arguments);

    this.get('message').dispatch(null, 'Booting system...', 4.75, true);

    later(() => {
      this.set('title', 'Gloss');
    }, 1500);

    later(() => {
      this.get('message').dispatch(null, 'System ready', null, true);
    }, 3000);

    // TODO: Check connection

    later(() => {
      this.transitionToRoute('authorize');
    }, 5000);
  }

});
