/* global Odometer */
import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);

    this.od = new Odometer({
      el: this.get('element'),
      value: 0
    });

    later(() => {
      this.od.update(this.get('value'));
    }, 2000);
  },

  didUpdateAttrs() {
    this._super(...arguments);

    this.od.update(this.get('value'));
  }

});
