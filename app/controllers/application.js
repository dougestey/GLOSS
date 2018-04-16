import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  arbiter: service(),

  session: service(),

  message: service(),

  messageHeader: reads('message.header'),

  messageSubheader: reads('message.subheader'),

  isShowingMessage: reads('message.isShowingMessage'),

  stopAnimating: reads('message.stopAnimating'),

  shouldNotOverlay: reads('message.shouldNotOverlay'),

  async init() {
    this._super(...arguments);

    await this.get('session').initialize();
    this.get('arbiter').connect();
  }

});
