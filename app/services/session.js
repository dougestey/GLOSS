import Service, { inject as service } from '@ember/service';

export default Service.extend({

  ajax: service(),

  router: service('-routing'),

  async initialize() {
    let character;

    try {
      let response = await this.get('ajax').request('/auth/whoami', { xhrFields: { withCredentials: true } });
      character = response.character;
    } catch(e) {
      this.get('router').transitionTo('welcome');
    }

    if (character) {
      this.set('character', character);
    } else {
      this.get('router').transitionTo('welcome');
    }
  }

});
