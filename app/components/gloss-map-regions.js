import Component from '@ember/component';

export default Component.extend({
  classNames: ['Gloss-regions'],

  actions: {
    selectRegion(region) {
      this.sendAction('selectRegion', region);
    }
  }
});
