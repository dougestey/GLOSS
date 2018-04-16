import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  message: service(),

  tracker: service(),

  fleets: reads('tracker.fleets.[]'),

  detailMode: false,

  actions: {
    selectThreat({ fleet, faction }) {
      this.toggleProperty('detailMode');

      this.set('selectedFleet', fleet);
      this.set('selectedFaction', faction);
    },

    clearThreat() {
      this.toggleProperty('detailMode');

      this.set('selectedFleet', undefined);
      this.set('selectedFaction', undefined);
    },

    untrackThreat() {
      let fleet = this.get('selectedFleet');
      let faction = this.get('selectedFaction');

      this.get('tracker').remove(fleet);

      this.toggleProperty('detailMode');

      this.get('message').dispatch(`Tracking disabled`, `${faction.name}`, 5);
    }
  }

});
