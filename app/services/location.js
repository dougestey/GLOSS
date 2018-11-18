import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  arbiter: service(),

  start(characterId) {
    let socket = this.get('arbiter.socket');

    // Periodic character updates
    socket.on('character', bind(this, this.updateCharacter));

    // Initial character request & subscription
    socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));
  },

  updateCharacter(data) {
    let socket = this.get('arbiter.socket');

    let previousSystemId = this.get('system.id');
    let previousConstellationId = this.get('constellation.id');
    let previousRegionId = this.get('region.id');

    if (!previousSystemId) {
      socket.get(`/api/systems/${data.system.id}`, bind(this, this.updateSystem));
      socket.get(`/api/constellations/${data.system.constellation}`, bind(this, this.updateConstellation));
      socket.get(`/api/regions/${data.system.region}`, bind(this, this.updateRegion));
    }

    if (previousSystemId && previousSystemId !== data.system.id) {
      socket.get(`/api/systems/${data.system.id}`, bind(this, this.updateSystem));

      if (previousConstellationId && previousConstellationId !== data.system.constellation) {
        socket.get(`/api/constellations/${data.system.constellation}`, bind(this, this.updateConstellation));

        if (previousRegionId && previousRegionId !== data.system.region) {
          socket.get(`/api/regions/${data.system.region}`, bind(this, this.updateRegion));
        }
      }
    }

    this.set('character', data);
  },

  updateSystem(system) {
    this.set('system', system);
  },

  updateConstellation(constellation) {
    this.set('constellation', constellation);
  },

  updateRegion(region) {
    this.set('region', region);
  },
});
