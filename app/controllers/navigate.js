import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Controller.extend({

  location: service(),

  character: computed.reads('location.character'),

  system: computed.reads('location.system'),

  messageHeader: computed('character.name', function() {
    let name = this.get('character.name');

    return name ? 'Link established' : 'Receiving...';
  }),

  messageSubheader: computed('character.name', function() {
    let name = this.get('character.name');

    return `Welcome, ${name}.`;
  }),

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 3000);
  }

});
