import Service, { inject as service } from '@ember/service';
import { Promise } from 'rsvp';

export default Service.extend({

  arbiter: service(),

  calculateRoute(origin, destination) {
    let socket = this.get('arbiter.socket');

    return new Promise((resolve) => {
      socket.get(`/api/navigation/route/${origin}/${destination}`, (data) => {
        resolve(data);
      });
    });
  }

});
