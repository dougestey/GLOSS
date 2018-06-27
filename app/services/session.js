import Service, { inject as service } from '@ember/service';
import ENV from 'gloss/config/environment';

export default Service.extend({

  ajax: service(),

  router: service(),

  raven: service(),

  async initialize() {
    let character;

    try {
      let response = await this.get('ajax').request('/auth/whoami', { xhrFields: {
        withCredentials: true
      }});
      character = response.character;
    } catch(e) {
      this.get('router').transitionTo('/');
    }

    if (character) {
      this.set('character', character);
      this.get('raven').callRaven('setUserContext', { id: character.id, name: character.name, version: ENV.APP.version });
    } else {
      this.get('router').transitionTo('welcome');
    }
  }

});
