/* global io */
import Service, { inject as service } from '@ember/service';
import { filter } from '@ember/object/computed';
import { bind } from '@ember/runloop';
import moment from 'npm:moment';

export default Service.extend({

  store: service(),

  all: [],

  latest: filter('all', function(item, index) {
    return (index < 5);
  }),

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

    this.get('all').pushObject(record);
  },

  // Golem down (IP-MVJ)
  // Ten minutes ago / Damian Lansing (Widow) + 5
  _generateKillNotification(kill, report) {
    let fleetString = '';

    if (kill.totalAttackers > 1)
      fleetString = ` + ${kill.totalAttackers}`;

    let notification = {
      type: 'kill',
      time: kill.time,
      systemName: kill.system,
      systemId: kill.systemId,
      subject: kill.victim.name,
      subjectContext: kill.victim.ship,
      message: kill.attacker.name,
      messageContext: `${kill.attacker.ship}${fleetString}`,
      isRead: false,
      report
    };

    this.dispatchNotification(notification);
  }

});
