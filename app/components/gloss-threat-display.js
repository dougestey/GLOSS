import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({

  latestBattleReport: computed('selectedFleet', function() {
    let selectedFleet = this.get('selectedFleet');

    if (!selectedFleet || !selectedFleet.kills.length)
      return null;

    let { id } = selectedFleet.system;
    let { time } = selectedFleet.kills.get('lastObject');
    let timestamp = moment(time).utc().format('YYYYMMDDHHmm');

    return `https://zkillboard.com/related/${id}/${timestamp}/`;
  }),

});
