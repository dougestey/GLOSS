import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Controller.extend({

  message: service(),

  notifications: service(),

  tracker: service(),

  fleets: reads('notifications.fleets.[]'),

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 500);

    later(() => {
      this.set('loadNotifications', true);
    }, 5000);
  },

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

    trackThreat() {
      let fleet = this.get('selectedFleet');
      let faction = this.get('selectedFaction');

      this.get('tracker').add(fleet);

      this.get('message').dispatch(`Tracking enabled`, `${faction.name}`, 2);
    }
  }

});
