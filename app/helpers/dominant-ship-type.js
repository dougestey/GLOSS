import { helper } from '@ember/component/helper';
import _ from 'npm:lodash';

export function dominantShipType(params/*, hash*/) {
  let [
    composition,
    characters
  ] = params;

  let counted = _.countBy(composition);

  let id = parseInt(_.max(_.keys(counted), (o) => counted[o]));
  let count = parseInt(_.max(counted));

  let characterId = parseInt(_.findKey(composition, function(i) {
    return i === id;
  }));

  let character = _.findWhere(characters, { 'characterId': parseInt(characterId) });
  let name;

  if (!character || !character.ship || !character.ship.name) {
    name = 'Unknown';
  } else {
    name = character.ship.name;
  }

  return { id, count, name };
}

export default helper(dominantShipType);
