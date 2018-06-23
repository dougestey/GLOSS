import { helper } from '@ember/component/helper';

export function threatImageUrl(params) {
  let faction = params[0];

  return `https://imageserver.eveonline.com/${faction.type}/${faction.id}_128.png`;
}

export default helper(threatImageUrl);
