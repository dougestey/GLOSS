import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  arbiter: service(),

  application: controller(),

  navigate: controller(),

  location: service(),

  discovery: service(),

  tracker: service(),

  message: service(),

  isConnected: reads('arbiter.connected'),

  route: reads('application.currentPath'),

  character: reads('location.character'),

  fleets: reads('discovery.fleets.length'),

  kills: reads('discovery.kills.length'),

  trackedFleets: reads('tracker.fleets.[]'),

  selectedFleetIsTracked: computed('selectedFleet.id', 'trackedFleets.[]', function() {
    let fleet = this.get('selectedFleet');
    let fleets = this.get('trackedFleets');

    if (!fleet)
      return false;

    let existingTrackedFleet = fleets.findBy('id', fleet.id);
    return !!existingTrackedFleet;
  }),

  context: computed('route', function() {
    let route = this.get('route');
    let context = route.split('.')[1];

    return context;
  }),

  mode: computed('route', function() {
    let route = this.get('route');
    let mode = route.split('.')[0];

    return mode;
  }),

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
    selectFleet(fleet) {
      this.set('selectedFleet', fleet);
      // this.set('selectedFaction', faction);
      // this.set('selectedShipType', shipType);
      // this.set('selectedShipCount', otherShipCount);

      $('.ui.threat.modal').modal('show');
      $('.ui.threat.modal').modal('hide dimmer');
      $('.ui.threat.modal').scrollTop(0);
    },

    toggleTracking() {
      let fleet = this.get('selectedFleet');
      // let faction = this.get('selectedFaction');
      let fleetIsTracked = this.get('selectedFleetIsTracked');

      if (fleetIsTracked) {
        this.get('tracker').remove(fleet);
        this.get('message.dispatch').perform(`Tracking disabled`, undefined, 2);
      } else {
        this.get('tracker').add(fleet);
        this.get('message.dispatch').perform(`Tracking enabled`, undefined, 2);
      }
    },
  }

});
