import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Controller.extend({

  arbiter: service(),

  location: service(),

  notifications: service(),

  tracker: service(),

  character: reads('location.character'),

  system: reads('location.system'),

  kills: reads('notifications.kills.[]'),

  fleets: reads('notifications.fleets.[]'),

  tracked: reads('tracker.fleets.[]'),

  isConnected: reads('arbiter.connected'),

  showKillStream: false,

  queryParams: ['showKillStream'],

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
    toggleKillStream() {
      this.toggleProperty('showKillStream');
    }
  }

});
