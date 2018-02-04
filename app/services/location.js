/* global io */
import Service from '@ember/service';
import { bind } from '@ember/runloop';
import { computed } from '@ember/object';

export default Service.extend({

  start(characterId) {
    io.socket.on('character', bind(this, this.updateCharacter));
    io.socket.on('system', bind(this, this.updateSystem));

    io.socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));
  },

  updateCharacter(data) {
    let systemId = data.system.systemId;

    io.socket.get(`/api/systems/${systemId}`, bind(this, this.updateSystem));

    this.set('character', data);
  },

  updateSystem(data) {
    this.set('system', data);
  }

});
