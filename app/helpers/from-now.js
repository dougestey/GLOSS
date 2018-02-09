import { helper } from '@ember/component/helper';
import moment from 'npm:moment';

export function fromNow(params/*, hash*/) {
  return moment(params[0]).fromNow();
}

export default helper(fromNow);
