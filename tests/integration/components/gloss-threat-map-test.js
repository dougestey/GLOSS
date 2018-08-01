import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gloss-threat-map', 'Integration | Component | gloss threat map', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gloss-threat-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gloss-threat-map}}
      template block text
    {{/gloss-threat-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
