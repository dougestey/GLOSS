import Component from '@ember/component';

export default Component.extend({

  tagName: 'tr',

  click() {
    let fleet = this.get('fleet');

    this.sendAction('selectFleet', fleet);
  },

});
