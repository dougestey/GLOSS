import { helper } from '@ember/component/helper';

export function threatLevel(params/*, hash*/) {
  let dangerRatio = params[0];

  if (dangerRatio === 0) {
    return 'unknown';
  }

  if (dangerRatio < 0.5) {
    return 'low';
  }

  if (dangerRatio < 0.7) {
    return 'moderate';
  }
}

export default helper(threatLevel);
