import Service from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Service.extend({

  isShowingMessage: computed('header', 'subheader', 'shouldShowMessage', function() {
    let shouldShowMessage = this.get('shouldShowMessage');

    if (shouldShowMessage) {
      return true;
    }

    this.set('shouldShowMessage', true);

    later(() => { this.set('shouldShowMessage', false) }, 5000);
  })

});
