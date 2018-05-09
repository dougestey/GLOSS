import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'http://gloss',
  namespace: '/api',
  xhrFields: {
    withCredentials: true
  }
});
