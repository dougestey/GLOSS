import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { storageFor } from 'ember-local-storage';
import _ from 'npm:lodash';

export default Component.extend({

  trackedFleets: storageFor('tracked-fleets'),

  classNames: [
    // 'Gloss-notification',
    // 'Gloss-threat'
    'card',
    'ui',
    'raised'
  ],

  click() {
    let fleet = this.get('model'),
        faction = this.get('dominantFaction'),
        shipType = this.get('dominantShipType'),
        otherShipCount = this.get('otherShipCount');

    this.sendAction('selectThreat', { fleet, faction, shipType, otherShipCount });
  },

  isTracked: computed('model.id', function() {
    return this.get('trackedFleets').includes(this.get('model.id'));
  }),

  dominantShipType: computed('model.composition', 'model.characters', function() {
    let composition = this.get('model.composition');
    let characters = this.get('model.characters');
    let counted = _.countBy(composition);

    let id = parseInt(_.max(_.keys(counted), (o) => counted[o]));
    let count = parseInt(_.max(counted));

    let characterId = parseInt(_.findKey(composition, function(i) {
      return i === id;
    }));
    let character = _.findWhere(characters, { 'characterId': parseInt(characterId) });
    let { name } = character.ship;

    return { id, count, name };
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

  threatImageUrl: computed('dominantFaction', function() {
    let faction = this.get('dominantFaction');

    return `https://imageserver.eveonline.com/${faction.type}/${faction.id}_128.png`;
  }),

  backgroundImage: computed('dominantShipType', function() {
    let { id } = this.get('dominantShipType');

    return htmlSafe(`background-image: url(https://imageserver.eveonline.com/Render/${id}_512.png) !important;`);
  }),

  actions: {
    track(id) {
      this.get('trackedFleets').addObject(id);
    }
  }

});
