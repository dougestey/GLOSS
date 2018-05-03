import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  message: service(),

  tracker: service(),

  fleets: reads('tracker.fleets.[]'),

  threatImageUrl: computed('selectedFaction', function() {
    let faction = this.get('selectedFaction');

    if (faction)
      return `https://imageserver.eveonline.com/${faction.type}/${faction.id}_128.png`;
  }),

  actions: {
    selectThreat({ fleet, faction, shipType, otherShipCount }) {
      this.toggleProperty('detailMode');

      this.set('selectedFleet', fleet);
      this.set('selectedFaction', faction);
      this.set('selectedShipType', shipType);
      this.set('selectedShipCount', otherShipCount);

      $('.ui.threat.modal').modal('show');
      $('.ui.threat.modal').modal('hide dimmer');
    },

    untrackThreat() {
      let fleet = this.get('selectedFleet');
      let faction = this.get('selectedFaction');

      this.get('tracker').remove(fleet);

      this.get('message').dispatch(`Tracking disabled`, `${faction.name}`, 2);
    }
  }

});
