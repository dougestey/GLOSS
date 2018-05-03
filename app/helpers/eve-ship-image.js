import { helper } from '@ember/component/helper';

export function eveShipImage(params) {
  let id = parseInt(params[0]),
      link = `https://imageserver.eveonline.com/Render/${id}_256.png`;

  return link;
}

export default helper(eveShipImage);
