import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  arbiter: service(),

  message: service(),

  notifications: service(),

  firstCharacterLoad: true,

  start(characterId) {
    let socket = this.get('arbiter.socket');

    socket.on('character', bind(this, this.updateCharacter));
    socket.on('system', bind(this, this.updateSystem));

    socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));
  },

  updateCharacter(data) {
    let socket = this.get('arbiter.socket');
    let systemId = data.system.systemId;

    socket.get(`/api/systems/${systemId}`, bind(this, this.updateSystem));

    this.set('character', data);
  },

  updateSystem(data) {
    let characterLocation = this.get('character.system');

    if (characterLocation.id === data.id)
      this.set('system', data);
  }

});
