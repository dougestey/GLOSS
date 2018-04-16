import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Controller.extend({

  message: service(),

  notifications: service(),

  tracker: service(),

  fleets: reads('notifications.fleets.[]'),

  detailMode: false,

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 500);

    later(() => {
      this.set('loadNotifications', true);
    }, 5000);
  },

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

    trackThreat() {
      let fleet = this.get('selectedFleet');
      let faction = this.get('selectedFaction');

      this.get('tracker').add(fleet);

      this.toggleProperty('detailMode');

      this.get('message').dispatch(`Tracking enabled`, `${faction.name}`, 5);
    }
  }

});
