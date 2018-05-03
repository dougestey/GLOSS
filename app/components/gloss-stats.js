import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  actions: {
    openAboutDialog() {
      $('.ui.about.modal').modal('show');
      $('.ui.about.modal').modal('hide dimmer');
    }
  }
});
