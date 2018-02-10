/* global io */
import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';
import moment from 'npm:moment';

export default Service.extend({

  store: service(),

  latest: [],

  // TODO: Types will be configurable in settings
  enable() {
    io.socket.on('kill', bind(this, this.dispatchKill));
  },

  async dispatchKill(kill) {
    let report = await this.get('store').createRecord('kill', kill).save();

    this._generateKillNotification(kill, report);
  },

  async dispatchNotification(notification) {
    let record = await this.get('store').createRecord('notification', notification).save();

    this.get('latest').pushObject(record);
  },

  // Golem down (IP-MVJ)
  // Ten minutes ago / Damian Lansing (Widow) + 5
  _generateKillNotification(kill, report) {
    let fleetString = '',
        attackerString = '';

    if (kill.totalAttackers > 1)
      fleetString = ` + ${kill.totalAttackers}`;

    if (kill.attacker.name)
      attackerString = `${kill.attacker.name} `;

    let notification = {
      type: 'kill',
      time: kill.time,
      systemName: kill.system,
      systemId: kill.systemId,
      subject: `${kill.victim.ship} down`,
      message: `${attackerString}(${kill.attacker.ship})${fleetString}`,
      report
    };

    this.dispatchNotification(notification);
  }

});
