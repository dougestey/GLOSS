import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

var _isWormhole = (system) => {
  return system.name.indexOf('J') === 0 && !isNaN(system.name.charAt(1));
};

export default Service.extend({

  arbiter: service(),

  intel: service(),

  firstCharacterLoad: true,

  start(characterId) {
    let socket = this.get('arbiter.socket');

    socket.on('character', bind(this, this.updateCharacter));
    socket.on('system', bind(this, this.updateCurrentSystem));
    socket.on('constellation', bind(this, this.updateCurrentConstellation));
    socket.on('region', bind(this, this.updateCurrentRegion));

    socket.get(`/api/characters/${characterId}`, bind(this, this.updateCharacter));
  },

  updateCharacter(data) {
    let previousSystemId = this.get('system.id');
    let previousConstellationId = this.get('constellation.id');
    let previousRegionId = this.get('region.id');
    let socket = this.get('arbiter.socket');

    if (!previousSystemId) {
      socket.get(`/api/systems/${data.system.id}`, bind(this, this.updateSystem));
      socket.get(`/api/constellations/${data.system.constellation}`, bind(this, this.updateConstellation));
      socket.get(`/api/regions/${data.system.region}`, bind(this, this.updateRegion));
    }

    if (previousSystemId && previousSystemId !== data.system.id) {
      // System jump has occurred
      this.get('intel.fleets.system').clear();
      this.get('intel.kills.system').clear();
      socket.get(`/api/systems/${previousSystemId}/untrack`, () => {
        socket.get(`/api/systems/${data.system.id}`, bind(this, this.updateSystem));
      });

      if (previousConstellationId && previousConstellationId !== data.system.constellation) {
        // Constellation jump has occurred
        this.get('intel.fleets.constellation').clear();
        this.get('intel.kills.constellation').clear();
        socket.get(`/api/constellations/${previousConstellationId}/untrack`, () => {
          socket.get(`/api/constellations/${data.system.constellation}`, bind(this, this.updateConstellation));
        });

        if (previousRegionId && previousRegionId !== data.system.region) {
          // Region jump has occurred
          this.get('intel.fleets.region').clear();
          this.get('intel.kills.region').clear();
          socket.get(`/api/regions/${previousRegionId}/untrack`, () => {
            socket.get(`/api/regions/${data.system.region}`, bind(this, this.updateRegion));
          });
        }
      }
    }

    this.set('character', data);
  },

  updateSystem(system) {
    if (_isWormhole(system)) {
      system.stats.npcKills = '?';
      system.stats.shipKills = '?';
      system.stats.podKills = '?';
      system.stats.shipJumps = '?';

      return this.set('system', system);
    }

    this.set('system', system);
  },

  updateCurrentSystem(system) {
    let currentSystem = this.get('system');

    if (currentSystem.id === system.id) {
      if (_isWormhole(system)) {
        system.stats.npcKills = '?';
        system.stats.shipKills = '?';
        system.stats.podKills = '?';
        system.stats.shipJumps = '?';
  
        return this.set('system', system);
      }
  
      this.set('system', system);
    }
  },

  // Only called when character state changes.
  updateConstellation(constellation) {
    this.set('constellation', constellation);
  },

  // Only called when character state changes.
  updateCurrentConstellation(constellation) {
    let currentConstellation = this.get('constellation');

    if (currentConstellation.id === constellation.id)
      this.set('constellation', constellation);
  },

  // Only called when character state changes.
  updateRegion(region) {
    this.set('region', region);
  },

  updateCurrentRegion(region) {
    let currentRegion = this.get('region');

    if (currentRegion.id === region.id)
      this.set('region', region);
  },

});
