import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Controller.extend({

  notifications: service(),

  fleets: reads('notifications.fleets.[]'),

  init() {
    this._super(...arguments);

    later(() => {
      this.set('loadUiElements', true);
    }, 500);

    this.get('notifications').enable();

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
    }
  }

});
