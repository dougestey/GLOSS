import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: [
    'Gloss-shard'
  ],

  classNameBindings: [
    'primary:Gloss-shard--primary',
    'isNumeric:Gloss-shard--number:Gloss-shard--string',
    'alignLeft:Gloss-shard--align-left'
  ],

  alignLeft: computed('align', function() {
    let alignLeft = this.get('align');

    return alignLeft;
  }),

  loadOrderClass: computed('loadOrder', 'bump', function() {
    let order = this.get('loadOrder'),
        orderClass = !isNaN(order) ? `ui-fade-${order}` : '',
        bumpClass = this.get('bump') ? 'bump-2' : '';

    return `${orderClass} ${bumpClass}`;
  }),

  isNumeric: computed('value', function() {
    let value = this.get('value');

    return !isNaN(value);
  })

});
