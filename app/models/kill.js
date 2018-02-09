import Report from './report';
const { attr, belongsTo } = DS;

export default Report.extend({

  killId: attr('number'),

  time: attr('string'),

  systemId: attr('number'),

  system: attr('raw'),

  victim: attr('raw'),

  attacker: attr('raw'),

  totalAttackers: attr('number'),

  fleetComposition: attr('raw'),

  fleetAffiliation: attr('raw')

});
