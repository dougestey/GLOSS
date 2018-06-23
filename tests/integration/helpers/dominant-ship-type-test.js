import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dominant-ship-type', 'helper:dominant-ship-type', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{dominant-ship-type inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
