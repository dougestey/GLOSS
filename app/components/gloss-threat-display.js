import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import _ from 'npm:lodash';
import moment from 'moment';

export default Component.extend({

  tracker: service(),

  trackerFleets: reads('tracker.fleets.[]'),

  dominantFaction: computed('selectedFleet.id', 'selectedFleet.characters', function() {
    let characters = this.get('selectedFleet.characters');

    if (!characters)
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

  dominantShipType: computed('selectedFleet.ships', 'selectedFleet.composition', function() {
    let ships = this.get('selectedFleet.ships');
    let composition = this.get('selectedFleet.composition');
    let shipTotals = _.countBy(composition);
    // results in { shipTypeId: 2, shipTypeId: 5 ... }

    if (!ships.length)
      return;

    let count = _.max(shipTotals); // 5
    let keysFromShipTotals = _.keys(shipTotals); // [ shipTypeId, shipTypeId... ]
    let selector = parseInt(_.max(keysFromShipTotals, (s) => shipTotals[s])); // reference shipTotals to get the relevant key
    let { id, name } = ships.findBy('id', selector);

    return { id, name, count };
  }),

  otherShipCount: computed('selectedFleet', 'dominantShipType', function() {
    let dominantShipType = this.get('dominantShipType');
    let totalPilots = this.get('selectedFleet.characters.length');

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

  selectedFleetIsTracked: computed('selectedFleet.id', 'trackerFleets.[]', function() {
    let fleet = this.get('selectedFleet');
    let fleets = this.get('trackerFleets');

    if (!fleet)
      return false;

    let existingTrackedFleet = fleets.findBy('id', fleet.id);
    return !!existingTrackedFleet;
  }),

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
