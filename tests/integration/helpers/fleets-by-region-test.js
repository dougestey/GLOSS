import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fleets-by-region', 'helper:fleets-by-region', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{fleets-by-region inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
