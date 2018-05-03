import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  classNames: [
    'Gloss-shard'
  ],

  classNameBindings: [
    'primary:Gloss-shard--primary',
    'isNumeric:Gloss-shard--number:Gloss-shard--string',
    'alignLeft:Gloss-shard--align-left',
    'alignRight:Gloss-shard--align-right'
  ],

  attributeBindings: [
    'shardStyle:style'
  ],

  click() {
    if (this.get('selectAction'))
      this.sendAction('selectAction');
  },

  shardStyle: computed('selectAction', function() {
    let selectAction = this.get('selectAction');

    if (selectAction)
      return htmlSafe(`cursor: pointer;`);
  }),

  alignLeft: computed('align', function() {
    let alignLeft = this.get('align');

    return alignLeft === 'left';
  }),

  alignRight: computed('align', function() {
    let alignRight = this.get('align');

    return alignRight === 'right';
  }),

  loadOrderClass: computed('loadOrder', 'bump', function() {
    let order = this.get('loadOrder'),
        orderClass = !isNaN(order) ? `ui-fade-${order}` : '',
        bumpClass = this.get('bump') ? 'mt2' : '';

    return `${orderClass} ${bumpClass}`;
  }),

  isNumeric: computed('value', function() {
    let value = this.get('value');

    return !isNaN(value);
  })

});
