import Service, { inject as service } from '@ember/service';

export default Service.extend({

  ajax: service(),

  async current() {
    let location = await this.get('ajax').request('/location/current');

    return location;
  }

});
