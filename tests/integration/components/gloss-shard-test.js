import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gloss-shard', 'Integration | Component | gloss shard', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gloss-shard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gloss-shard}}
      template block text
    {{/gloss-shard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
