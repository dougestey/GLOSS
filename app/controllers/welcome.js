import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Controller.extend({

  message: service(),

  title: null,

  init() {
    this._super(...arguments);

    this.get('message').setProperties({
      subheader: 'Booting system...',
      seconds: 5
    });

    this.get('message').show();

    later(() => {
      this.set('title', 'Gloss');
    }, 1500);

    later(() => {
      this.get('message').setProperties({
        subheader: 'System ready',
        stopAnimating: true
      });
    }, 3000);

    later(() => {
      this.transitionToRoute('authorize');
    }, 5000);
  }

});
