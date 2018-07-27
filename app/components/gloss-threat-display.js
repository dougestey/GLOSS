import Component from '@ember/component';

export default Component.extend({

  actions: {
    toggleTracking(fleet) {
      this.sendAction('toggleTracking', fleet);
    }
  }

});
