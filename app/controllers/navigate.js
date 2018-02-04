import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Controller.extend({

  location: service(),

  character: computed.reads('location.character'),

  system: computed.reads('location.system'),

  welcomeMessage: computed('character.name', function() {
    let name = this.get('character.name');

    return `Link established. Welcome, ${name}.`;
  }),

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 3000);
  }

});
