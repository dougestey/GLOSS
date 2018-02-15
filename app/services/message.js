import Service from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Service.extend({

  show() {
    this.set('isShowingMessage', true);

    if (this.get('seconds'))
      later(() => this.set('isShowingMessage', false), this.get('seconds') * 1000);
  }

});
