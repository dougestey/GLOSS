import IndexedDbConfigurationService from 'ember-indexeddb/services/indexed-db-configuration';
import { computed, get } from '@ember/object';

let _sanitize = (data) => {
  let clean = Object.create(null);

  for (let i in data) {
    if (!data.hasOwnProperty(i)) {
      continue;
    }

    clean[i] = data[i];
  }

  return clean;
};

export default IndexedDbConfigurationService.extend({
  currentVersion: 1,

  version1: {
    stores: {
      'notification': '&id,time,report',
      'kill': '&id,systemId'
    }
  },

  mapTable: computed(function() {
    let config = this;

    return {
      'notification': (item) => {
        return {
          id: this._toString(get(item, 'id')),
          time: this._toString(get(item, 'time')),
          report: this._toString(get(item, 'report'))
        };
      },
      'kill': (item) => {
        return {
          id: this._toString(get(item, 'id')),
          time: this._toString(get(item, 'attributes.time')),
          killId: get(item, 'attributes.kill-id'),
          systemId: get(item, 'attributes.system-id'),
          system: get(item, 'attributes.system'),
          victim: _sanitize(get(item, 'attributes.victim')),
          attacker: _sanitize(get(item, 'attributes.attacker')),
          totalAttackers: get(item, 'attributes.total-attackers'),
          fleetComposition: get(item, 'attributes.fleet-composition'),
          totalAttackers: get(item, 'attributes.fleet-affiliation'),
        };
      }
    };
  })

});
