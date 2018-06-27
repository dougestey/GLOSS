import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gloss-message-disposable', 'Integration | Component | gloss message disposable', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gloss-message-disposable}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gloss-message-disposable}}
      template block text
    {{/gloss-message-disposable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
