import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({

  message: service(),

  messageHeader: reads('message.header'),

  messageSubheader: reads('message.subheader'),

  isShowingMessage: reads('message.isShowingMessage')

});
