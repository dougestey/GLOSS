import { helper } from '@ember/component/helper';

export function threatImageUrl(params) {
  let faction = params[0];

  if (faction.type === 'Character')
    return `https://imageserver.eveonline.com/${faction.type}/${faction.id}_128.jpg`;

  return `https://imageserver.eveonline.com/${faction.type}/${faction.id}_128.png`;
}

export default helper(threatImageUrl);
