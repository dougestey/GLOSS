import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'gloss/config/environment';

export default AjaxService.extend({
  host: ENV.ARBITER_URL,
  namespace: '/api',
});
