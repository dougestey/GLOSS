import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  discover: controller(),

  discovery: service(),

  kills: reads('discovery.kills.[]'),

  actions: {
    selectFleetById(id) {
      this.get('discover').send('selectFleetById', id);
    },
  }

});
