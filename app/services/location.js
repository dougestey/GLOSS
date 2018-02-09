/* global io */
import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  notifications: service(),

  start(characterId) {
    io.socket.on('character', bind(this, this.updateCharacter));
    io.socket.on('system', bind(this, this.updateSystem));

    io.socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));

    this.get('notifications').enable();
  },

  updateCharacter(data) {
    let systemId = data.system.systemId;

    io.socket.get(`/api/systems/${systemId}`, bind(this, this.updateSystem));

    this.set('character', data);
  },

  updateSystem(data) {
    let characterLocation = this.get('character.system');

    if (characterLocation.id === data.id)
      this.set('system', data);
  }

});
