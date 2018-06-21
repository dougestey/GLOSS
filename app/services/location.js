import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

var _isWormhole = (system) => {
  return system.name.indexOf('J') === 0 && !isNaN(system.name.charAt(1));
};

export default Service.extend({

  arbiter: service(),

  firstCharacterLoad: true,

  start(characterId) {
    let socket = this.get('arbiter.socket');

    socket.on('character', bind(this, this.updateCharacter));
    socket.on('system', bind(this, this.updateSystem));

    socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));
  },

  updateCharacter(data) {
    let previousSystemId = this.get('system.id');
    let socket = this.get('arbiter.socket');
    let systemId = data.system.id;
    let constellationId = data.system.constellation;

    socket.get(`/api/systems/${systemId}`, bind(this, this.updateSystem));
    socket.get(`/api/constellations/${constellationId}`, bind(this, this.updateConstellation));

    // if (previousSystemId)
    //   socket.get(`/api/systems/${previousSystemId}/untrack`);

    this.set('character', data);
  },

  updateSystem(system) {
    let characterLocation = this.get('character.system');

    if (_isWormhole(system)) {
      if (this.get('system.updatedAt'))
        system.updatedAt = this.get('system.updatedAt');
      else
        system.updatedAt = '?';

      system.shipJumps = '?';
      system.npcKills = '?';
      system.shipKills = '?';
      system.podKills = '?';
    } else {
      // const
    }

    if (characterLocation.id === system.id) {
      this.set('system', system);
    }
  },

  updateConstellation(constellation) {
    this.set('constellation', constellation);
  }

});
