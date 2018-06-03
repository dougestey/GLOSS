import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Controller.extend({

  arbiter: service(),

  message: service(),

  init() {
    this._super(...arguments);

    this.get('message').dispatch(null, 'Booting system...', undefined, true);

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
  }

});
