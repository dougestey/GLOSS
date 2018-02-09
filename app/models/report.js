import DS from 'ember-data';
const { belongsTo } = DS;

export default DS.Model.extend({

  notification: belongsTo('notification', { inverse: 'report', async: true })

});
