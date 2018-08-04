import Component from '@ember/component';

export default Component.extend({

  tagName: 'tr',

  click() {
    let killId = this.get('kill.killId');

    window.open(`https://zkillboard.com/kill/${killId}/`,'_blank');
  },

  actions: {
    viewAssociatedFleet() {
      let id = this.get('kill.fleet.id');

      this.sendAction('selectFleetById', id);
    }
  },

});
