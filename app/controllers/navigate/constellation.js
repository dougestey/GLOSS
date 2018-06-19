import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({

  navigate: controller(),

  actions: {
    selectThreat() {
      this.get('navigate').send('selectThreat');
    },

    trackThreat() {
      this.get('navigate').send('trackThreat');
    },

    untrackThreat() {
      this.get('navigate').send('untrackThreat');
    }
  }

});
