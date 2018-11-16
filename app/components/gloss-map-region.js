import Component from '@ember/component';

export default Component.extend({
  classNames: ['Gloss-region'],

  click() {
    let region = this.get('region');

    this.sendAction('selectRegion', region);
  }
});
