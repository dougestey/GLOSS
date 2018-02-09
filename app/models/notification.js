import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({

  time: attr('string'),

  subject: attr('string'),

  message: attr('string'),

  icon: attr('string'),

  report: belongsTo('report', { polymorphic: true, async: true })

});
