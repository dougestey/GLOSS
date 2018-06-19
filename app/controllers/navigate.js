/* global $ */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Controller.extend({

  queryParams: {
    showKillStream: 'stream'
  },

  arbiter: service(),

  location: service(),

  intel: service(),

  tracker: service(),

  character: reads('location.character'),

  system: reads('location.system'),

  kills: reads('intel.kills.[]'),

  fleets: reads('intel.fleets.[]'),

  tracked: reads('tracker.fleets.[]'),

  isConnected: reads('arbiter.connected'),

  showKillStream: false,

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 500);

    later(() => {
      this.set('loadIntel', true);
    }, 5000);
  },

  actions: {
    toggleKillStream() {
      this.toggleProperty('showKillStream');
    },

    selectThreat({ fleet, faction, shipType, otherShipCount }) {
      this.toggleProperty('detailMode');

      this.set('selectedFleet', fleet);
      this.set('selectedFaction', faction);
      this.set('selectedShipType', shipType);
      this.set('selectedShipCount', otherShipCount);

      $('.ui.threat.modal').modal('show');
      $('.ui.threat.modal').modal('hide dimmer');
    },

    trackThreat() {
      let fleet = this.get('selectedFleet');
      let faction = this.get('selectedFaction');

      this.get('tracker').add(fleet);

      this.get('message').dispatch(`Tracking enabled`, `${faction.name}`, 2);
    },

    untrackThreat() {
      let fleet = this.get('selectedFleet');
      let faction = this.get('selectedFaction');

      this.get('tracker').remove(fleet);

      this.get('message').dispatch(`Tracking disabled`, `${faction.name}`, 2);
    }
  }

});
