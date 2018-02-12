import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({

  classNames: [
    'Gloss-notification'
  ],

  didInsertElement() {
    this._super(...arguments);

    let model = this.get('model');

    later(() => {
      model.set('isRead', true);
      model.save();
    }, 7500);
  },

  click() {
    let killId = this.get('model.report.killId');

    window.open(`https://zkillboard.com/kill/${killId}/`,'_blank');
  }

});
