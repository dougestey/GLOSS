import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gloss-shard-value', 'Integration | Component | gloss shard value', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gloss-shard-value}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gloss-shard-value}}
      template block text
    {{/gloss-shard-value}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
