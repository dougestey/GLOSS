import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  discovery: service(),

  kills: reads('discovery.kills.[]'),

});
