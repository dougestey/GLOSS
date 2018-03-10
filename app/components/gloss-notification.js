import Component from '@ember/component';
import { later } from '@ember/runloop';
import { computed} from '@ember/object';

export default Component.extend({

  classNames: [
    'Gloss-notification'
  ],

  click() {
    let killId = this.get('model.killId');

    window.open(`https://zkillboard.com/kill/${killId}/`,'_blank');
  },

  shipImageUrl: computed('model.ship.typeId', function() {
    let typeId = this.get('model.ship.typeId');

    return `https://imageserver.eveonline.com/Type/${typeId}_64.png`;
  })

});
