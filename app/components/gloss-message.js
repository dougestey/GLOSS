import Component from '@ember/component';

export default Component.extend({

  classNames: 'Gloss-message',

  classNameBindings: [
    'isShowingMessage:Gloss-message--show'
  ]

});
