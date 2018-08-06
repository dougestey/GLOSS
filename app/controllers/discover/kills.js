import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  discover: controller(),

  discovery: service(),

  kills: reads('discovery.kills.[]'),

  killsRenderable: computed('kills', function() {
    let kills = this.get('kills');

    if (!kills)
      return [];

    return kills.sortBy('time').reverse().slice(0, 500);
  }),

  actions: {
    selectFleet(id) {
      this.get('discover').send('selectFleet', id);
    },
  }

});
