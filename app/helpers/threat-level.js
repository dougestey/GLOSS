import { helper } from '@ember/component/helper';

export function threatLevel(params/*, hash*/) {
  let dangerRatio = params[0];

  if (dangerRatio === 0) {
    return 'unknown';
  }

  if (dangerRatio < 50) {
    return 'low';
  }

  if (dangerRatio < 69) {
    return 'moderate';
  } else {
    return 'high';
  }
}

export default helper(threatLevel);
