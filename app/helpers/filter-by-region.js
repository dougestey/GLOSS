import { helper } from '@ember/component/helper';

export function fleetsByRegion(params) {
  let [ fleets, regionId ] = params;

  return fleets.filterBy('system.region.id', regionId);
}

export default helper(fleetsByRegion);
