import Component from '@ember/component';

export default Component.extend({

  willDestroy() {
    this._super(...arguments);

    this.get('action')();
  }

});
