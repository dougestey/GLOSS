import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({

  killId: attr('number'),

  time: attr('string'),

  systemId: attr('string'),

  totalAttackers: attr('number'),

  victimCharacterId: attr('number'),
  victimShipTypeId: attr('number'),
  victimCorporationId: attr('number'),
  victimAllianceId: attr('number'),
  
  attackerCharacterId: attr('number'),
  attackerShipTypeId: attr('number'),
  attackerCorporationId: attr('number'),
  attackerAllianceId: attr('number')

});
