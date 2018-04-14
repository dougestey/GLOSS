/* global io */
import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  message: service(),

  firstCharacterLoad: true,

  start(characterId) {
    io.socket.on('character', bind(this, this.updateCharacter));
    io.socket.on('system', bind(this, this.updateSystem));

    io.socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));
  },

  updateCharacter(data) {
    let systemId = data.system.systemId;

    io.socket.get(`/api/systems/${systemId}`, bind(this, this.updateSystem));

    if (this.get('firstCharacterLoad')) {
      this.get('message').dispatch(
        'Link established',
        `Hello, ${data.name}.`,
        2.75
      );

      this.set('firstCharacterLoad', false);
    }

    this.set('character', data);
  },

  updateSystem(data) {
    let characterLocation = this.get('character.system');

    if (characterLocation.id === data.id)
      this.set('system', data);
  }

});
