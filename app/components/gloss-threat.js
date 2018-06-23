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

  dominantShipType: computed('model.composition', 'model.characters', function() {
    let composition = this.get('model.composition');
    let characters = this.get('model.characters');
    let counted = _.countBy(composition);

    let count = parseInt(_.max(counted));
    let min = parseInt(_.min(counted));
    let name, shipId;

    if (count === min) {
      let character = _.last(_.sortBy(characters, 'dangerRatio'));
      shipId = composition[character.characterId];
      name = character.ship.name;
    } else {
      let shipId = parseInt(_.max(_.keys(counted), (o) => counted[o]));
      let characterId = parseInt(_.findKey(composition, function(typeId) {
        return typeId === shipId;
      }));
      let character = _.findWhere(characters, { 'characterId': characterId });

      if (!character || !character.ship || !character.ship.name) {
        name = 'Unknown';
      } else {
        name = character.ship.name;
      }
    }

    return { id: shipId, count, name };
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
