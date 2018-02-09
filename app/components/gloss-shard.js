import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: [
    'Gloss-shard'
  ],

  classNameBindings: [
    'primary:Gloss-shard--primary',
    'isNumeric:Gloss-shard--number:Gloss-shard--string',
  ],

  loadOrderClass: computed('loadOrder', function() {
    let order = this.get('loadOrder');

    return !isNaN(order) ? `ui-fade-${order}` : '';
  }),

  isNumeric: computed('value', function() {
    let value = this.get('value');

    return !isNaN(value);
  })

});
