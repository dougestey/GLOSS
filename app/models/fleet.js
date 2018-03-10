import Report from './report';
const { attr, belongsTo } = DS;

export default Report.extend({

  startTime: attr('string'),

  endTime: attr('string'),

  isActive: attr('boolean'),

  lastSeen: attr('string'),

  composition: attr('raw'),

  configuration: attr('raw'),

  efficiency: attr('number'),

  dangerRatio: attr('number')

});
