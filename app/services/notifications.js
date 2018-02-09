/* global io */
import Service, { inject as service } from '@ember/service';
import { bind } from '@ember/runloop';

export default Service.extend({

  store: service(),

  indexedDb: service(),

  enable() {
    io.socket.on('kill', bind(this, this.dispatchKill));
  },

  async dispatchKill(kill) {
    // TODO
    // let totalAttackersString = '';

    // if (totalAttackers > 1)
    //   totalAttackersString = ` + ${totalAttackers}`;
    // let notification = this.get('indexedDb').add('notification', {
    //   time: new Date().toISOString(),
    //   subject: `${kill.victim.ship} down in ${kill.system.name}`,
    //   message: `Killed by ${kill.attacker.name} (${kill.attacker.ship.name})${totalAttackersString}`
    // });
    return this.get('store').createRecord('kill', kill).save();
  }

});
