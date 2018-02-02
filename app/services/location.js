/* global io */
import Service, { inject as service } from '@ember/service';
import { bind, run } from '@ember/runloop';

export default Service.extend({

  start(characterId) {
    io.socket.on('character', bind(this, this.updateCharacter));
    io.socket.get(`/api/characters/${characterId}`, bind(this, this.loadCharacter));
  },

  updateCharacter(update) {
    this.set('character', Object.assign(update.previous, update.data));
  },

  loadCharacter(data) {
    this.set('character', data);
  }

});
