import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Route.extend({

  ajax: service(),

  location: service(),

  character: computed.reads('location.character'),

  model() {
    return this.get('ajax').request('/auth/whoami');
  },

  afterModel(model) {
    let characterId = model.character.characterId;

    this.get('location').start(characterId);
  }

});
