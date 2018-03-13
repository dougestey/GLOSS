import Controller from '@ember/controller';
import ENV from 'gloss/config/environment';
import { computed } from '@ember/object';

export default Controller.extend({

  arbiterUrl: ENV.ARBITER_URL,

  authorizeUrl: computed('arbiterUrl', function() {
    let hostName = this.get('arbiterUrl');

    return `${hostName}/auth/authorize`;
  })

});
