import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';

export default Controller.extend({

  arbiter: service(),

  session: service(),

  message: service(),

  messageHeader: reads('message.header'),

  messageSubheader: reads('message.subheader'),

  isShowingMessage: reads('message.isShowingMessage'),

  stopAnimating: reads('message.stopAnimating'),

  shouldNotOverlay: reads('message.shouldNotOverlay'),

  title: 'Gloss',

  async init() {
    this._super(...arguments);

    await this.get('session').initialize();
    this.get('arbiter').connect();

    later(() => {
      this.set('title', null);
    }, 10000);
  }

});
