import Component from '@ember/component';
import { computed } from '@ember/object';
import _ from 'npm:lodash';

export default Component.extend({

  classNames: [
    'Gloss-notification',
    'Gloss-threat'
  ],

  click() {
    let dominantFaction = this.get('dominantFaction'),
        fleet = this.get('model');

    fleet.dominantFaction = dominantFaction;

    this.sendAction('selectThreat', fleet);
  },

  dominantShipType: computed('model.composition', function() {
    let compHash = this.get('model.composition');

    return _.last(_.sortBy(compHash, 'quantity'));
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

  threatImageUrl: computed('dominantFaction', function() {
    let faction = this.get('dominantFaction');

    return `https://imageserver.eveonline.com/${faction.type}/${faction.id}_64.png`;
  })

});
