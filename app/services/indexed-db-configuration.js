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
      'notification': '&id,isRead,time',
      'kill': '&id,systemId'
    }
  },

  mapTable: computed(function() {
    let config = this;

    return {
      'notification': (item) => {
        return {
          id: this._toString(get(item, 'id')),
          json: this._cleanObject(item),
          type: this._toString(get(item, 'attributes.type')),
          isRead: this._toZeroOne(get(item, 'attributes.is-read')),
          time: this._toString(get(item, 'attributes.time')),
          systemName: this._toString(get(item, 'attributes.system-name')),
          systemId: get(item, 'attributes.system-id'),
          subject: this._toString(get(item, 'attributes.subject')),
          subjectContext: this._toString(get(item, 'attributes.subject-context')),
          message: this._toString(get(item, 'attributes.message')),
          messageContext: this._toString(get(item, 'attributes.message-context'))
        };
      },
      'kill': (item) => {
        return {
          id: this._toString(get(item, 'id')),
          json: this._cleanObject(item),
          time: this._toString(get(item, 'attributes.time')),
          killId: get(item, 'attributes.kill-id'),
          systemId: get(item, 'attributes.system-id'),
          system: get(item, 'attributes.system'),
          victim: _sanitize(get(item, 'attributes.victim')),
          attacker: _sanitize(get(item, 'attributes.attacker')),
          totalAttackers: get(item, 'attributes.total-attackers'),
          fleetComposition: get(item, 'attributes.fleet-composition'),
          fleetAffiliation: get(item, 'attributes.fleet-affiliation')
        };
      }
    };
  })

});
