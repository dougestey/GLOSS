/* global io */
import Service from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  start(characterId) {
    io.socket.on('character', bind(this, this.updateCharacter));
    io.socket.on('system', bind(this, this.updateSystem));
    io.socket.on('kill', bind(this, this.notifyOfKill));

    io.socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));
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
  },

  notifyOfKill(data) {
    // TODO: Coming soon
    // let systemId = this.get('character.system.systemId');
    console.log('new kill detected', data);
    // if (systemId === data.systemId)
    //   this.get('notifications').dispatch('kill', data);
  }

});
