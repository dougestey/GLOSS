import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

import _ from 'npm:lodash';

export default Component.extend({

  navigation: service(),

  location: service(),

  tracker: service(),

  classNames: [
    'card',
    'ui',
    'raised'
  ],

  didReceiveAttrs() {
    this._super(...arguments);

    this.get('calculateRoute').perform();
  },

  click() {
    let fleet = this.get('model'),
        faction = this.get('dominantFaction'),
        shipType = this.get('dominantShipType'),
        otherShipCount = this.get('otherShipCount');

    this.sendAction('selectFleet', { fleet, faction, shipType, otherShipCount });
  },

  dominantShipType: computed('model.ships', function() {
    let ships = this.get('model.ships');
    let shipTotals = _.countBy(ships, 'id');
    // results in { shipTypeId: 2, shipTypeId: 5 ... }

    let count = _.max(shipTotals); // 5
    let keysFromShipTotals = _.keys(shipTotals); // [ shipTypeId, shipTypeId... ]
    let selector = parseInt(_.max(keysFromShipTotals, (s) => shipTotals[s])); // reference shipTotals to get the relevant key
    let { id, name } = ships.findBy(selector, 'id');

    return { id, name, count };
  }),

  dominantFaction: computed('model.characters', function() {
    let characters = this.get('model.characters');

    let corps = [], alls = [];

    characters.map((character) => {
      corps.push(character.corporation);

      if (character.alliance)
        alls.push(character.alliance);
    });

    let corpHash = _.countBy(corps, 'corporationId'),
        allHash = _.countBy(alls, 'allianceId');

    let corpMaxKey = _.max(Object.keys(corpHash), (o) => corpHash[o]),
        allMaxKey = _.max(Object.keys(allHash), (o) => allHash[o]);

    let corpMax = corpHash[corpMaxKey],
        allMax = allHash[allMaxKey];

    if (!allMax || corpMax > allMax) {
      let { corporationId: id, name } = _.find(corps, (c) => c.corporationId === parseInt(corpMaxKey));

      return { id, name, type: 'Corporation' };
    } else {
      let { allianceId: id, name } = _.find(alls, (a) => a.allianceId === parseInt(allMaxKey));

      return { id, name, type: 'Alliance' };
    }
  }),

  otherShipCount: computed('model', 'dominantShipType', function() {
    let dominantShipType = this.get('dominantShipType');
    let totalPilots = this.get('model.characters.length');

    return totalPilots - dominantShipType.count;
  }),

  backgroundImage: computed('dominantShipType', function() {
    let { id } = this.get('dominantShipType');

    return htmlSafe(`background-image: url(https://imageserver.eveonline.com/Render/${id}_512.png) !important;`);
  }),

  calculateRoute: task(function * () {
    let origin = this.get('system');
    let destination = this.get('model.system.systemId');
    let route = yield this.get('navigation').calculateRoute(origin, destination);

    this.set('jumpsAway', route.length);
  }).drop(),

});
