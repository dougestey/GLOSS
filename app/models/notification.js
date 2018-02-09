import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({

  type: attr('string'),

  time: attr('string'),

  systemName: attr('string'),

  systemId: attr('number'),

  subject: attr('string'),

  message: attr('string'),

  report: belongsTo('report', { polymorphic: true, async: true })

});
