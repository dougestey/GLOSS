import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({

  classNames: [
    'Gloss-notification'
  ],

  click() {
    let killId = this.get('model.killId');

    window.open(`https://zkillboard.com/kill/${killId}/`,'_blank');
  }

});
