/* global io */
import Service, { inject as service } from '@ember/service';
import { filter } from '@ember/object/computed';
import { bind } from '@ember/runloop';
import moment from 'npm:moment';

export default Service.extend({

  store: service(),

  latest: [],

  fleets: [],

  // TODO: Types will be configurable in settings
  enable() {
    // io.socket.on('kill', bind(this, this.receiveKill));
    io.socket.on('fleet', bind(this, this.receiveFleet));
    io.socket.on('intel', bind(this, this.receiveIntel));
  },

  // async receiveKill(kill) {
  //   delete kill.id;
  //   let report = await this.get('store').createRecord('kill', kill).save();

  //   this._generateKillNotification(kill, report);
  // },

  async receiveFleet(fleet) {
    delete fleet.id;
    let report = await this.get('store').createRecord('fleet', fleet).save();
  },

  async receiveIntel(data) {
    let { fleets } = data;

    this.get('fleets').clear();

    fleets.map(async(fleet) => {
      let record = await this.get('store').createRecord('fleet', fleet).save();

      this.get('fleets').pushObject(record);
    });
  },

  // async receiveFleet(fleet) {
  //   delete fleet.id;
  //   let report = await this.get('store').createRecord('fleet', fleet).save();

  //   this._generateNotification(fleet, report);
  // },

  async dispatchNotification(notification) {
    let record = await this.get('store').createRecord('notification', notification).save();

    this.get('latest').pushObject(record);
  },

  // Damian Lansing (Golem)
  // Chad VanGaalen (Widow) + 5
  // 11 minutes ago in Rancer
  _generateKillNotification(kill, report) {
    // let fleetString = '';

    // if (kill.totalAttackers > 1)
    //   fleetString = ` + ${kill.totalAttackers}`;

    // let notification = {
    //   type: 'kill',
    //   time: kill.time,
    //   systemName: kill.system,
    //   systemId: kill.systemId,
    //   subject: kill.victim.name,
    //   subjectContext: kill.victim.ship,
    //   message: kill.attacker.name,
    //   messageContext: `${kill.attacker.ship}${fleetString}`,
    //   isRead: false,
    //   report
    // };

    // this.dispatchNotification(notification);
  },

  _generateFleetNotification(fleet, report) {

  }

});
