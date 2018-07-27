import Component from '@ember/component';
import { computed} from '@ember/object';

export default Component.extend({

  classNames: [
    'Gloss-notification'
  ],

  click(e) {
    e.stopPropagation();

    let killId = this.get('model.killId');

    window.open(`https://zkillboard.com/kill/${killId}/`,'_blank');
  },

  shipImageUrl: computed('model.ship.id', function() {
    let id = this.get('model.ship.id');

    return `https://imageserver.eveonline.com/Type/${id}_64.png`;
  })

});
