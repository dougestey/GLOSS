import Service from '@ember/service';

export default Service.extend({

  messages: [],

  dispatch(type, payload) {
    this.create(type, payload);
  }

});
