import Controller from '@ember/controller';
import { bind, later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import arbiter from '../services/arbiter';

export default Controller.extend({

  arbiter: service(),

  message: service(),

  title: null,

  init() {
    this._super(...arguments);

    this.get('message').dispatch(null, 'Booting system...', 3.75, true);

    later(() => {
      this.set('title', 'Gloss');
    }, 1500);

    later(() => {
      let online = this.get('arbiter').get('connected');

      if (online) {
        this.get('message').dispatch(
          null,
          `System ready`,
          null,
          true
        );
  
        this.get('arbiter').set('firstConnect', false);

        later(() => {
          this.get('message').clear();
          this.transitionToRoute('authorize');
        }, 2000);
      } else {
        this.get('message').dispatch(
          null,
          `System offline`,
          null,
          true
        );
      }
    }, 4000);

    // later(() => {
    //   this.get('message').dispatch(null, 'System ready', null, true);
    // }, 3000);

    // later(() => {
    //   this.transitionToRoute('authorize');
    // }, 5000);
  }

});
