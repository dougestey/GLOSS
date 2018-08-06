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

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.get('system'))
      this.get('calculateRoute').perform();
  },

  click() {
    let id = this.get('fleet.id');

    this.sendAction('selectFleet', id);
  },

  dominantShipType: computed('fleet.ships', 'fleet.composition', function() {
    let ships = this.get('fleet.ships');
    let composition = this.get('fleet.composition');
    let shipTotals = _.countBy(composition);
    // results in { shipTypeId: 2, shipTypeId: 5 ... }

    if (!ships || !ships.length)
      return;

    let count = _.max(shipTotals); // 5
    let keysFromShipTotals = _.keys(shipTotals); // [ shipTypeId, shipTypeId... ]
    let selector = parseInt(_.max(keysFromShipTotals, (s) => shipTotals[s])); // reference shipTotals to get the relevant key
    let { id, name } = ships.findBy('id', selector);

    return { id, name, count };
  }),

  dominantFaction: computed('fleet.characters', function() {
    let characters = this.get('fleet.characters');

    if (!characters.length)
      return {};

    if (characters.length === 1) {
      let type = 'Character';
      let { id, name } = characters[0];

      return { id, name, type };
    }

    let corps = [], alls = [];

    characters.map((character) => {
      corps.push(character.corporation);

      if (character.alliance)
        alls.push(character.alliance);
    });

    let corpHash = _.countBy(corps, 'id'),
        allHash = _.countBy(alls, 'id');

    let corpMaxKey = _.max(_.keys(corpHash), (o) => corpHash[o]),
        allMaxKey = _.max(_.keys(allHash), (o) => allHash[o]);

    let corpMax = corpHash[corpMaxKey],
        allMax = allHash[allMaxKey];

    if (!allMax || corpMax > allMax) {
      let { id, name } = _.find(corps, (c) => c.id === parseInt(corpMaxKey));

      return { id, name, type: 'Corporation' };
    } else {
      let { id, name } = _.find(alls, (a) => a.id === parseInt(allMaxKey));

      return { id, name, type: 'Alliance' };
    }
  }),

  otherShipCount: computed('model', 'dominantShipType', function() {
    let dominantShipType = this.get('dominantShipType');
    let totalPilots = this.get('fleet.characters.length');

    if (!dominantShipType || !dominantShipType.count) {
      if (!totalPilots)
        return;

      return `${totalPilots} pilots`;
    }

    let remaining = totalPilots - dominantShipType.count;

    if (remaining <= 0)
      return;

    if (remaining === 1)
      return `and ${remaining} other`;

    return `and ${remaining} others`;
  }),

  backgroundImage: computed('dominantShipType', function() {
    let dominantShipType = this.get('dominantShipType');

    if (!dominantShipType || !dominantShipType.id)
      return;

    return htmlSafe(`background-image: url(https://imageserver.eveonline.com/Render/${dominantShipType.id}_512.png) !important;`);
  }),

  calculateRoute: task(function * () {
    let origin = this.get('system');
    let destination = this.get('fleet.system.id');

    if (!origin || !destination)
      return;

    let route = yield this.get('navigation').calculateRoute(origin, destination);
    let jumpsAway = route.length - 1;

    if (jumpsAway === 0)
      jumpsAway = 'In-system';
    else
      jumpsAway = `${jumpsAway} jumps away`;

    this.set('jumpsAway', jumpsAway);
  }).drop(),

});
