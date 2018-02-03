export default function(){
  this.transition(
    this.fromRoute('welcome'),
    this.toRoute('authorize'),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.hasClass('ui-toRight'),
    this.toValue(true),
    this.use('toRight', { duration: 500 }),
    this.reverse('toLeft', { duration: 500 })
  );

  this.transition(
    this.hasClass('ui-fade-1'),
    this.toValue(true),
    this.use('fade', { duration: 500 }),
    this.reverse('fade', { duration: 500 })
  );

  this.transition(
    this.hasClass('ui-fade-2'),
    this.toValue(true),
    this.use('fade', { duration: 500, delay: 250 }),
    this.reverse('fade', { duration: 500, delay: 250 })
  );

  this.transition(
    this.hasClass('ui-fade-3'),
    this.toValue(true),
    this.use('fade', { duration: 500, delay: 500 }),
    this.reverse('fade', { duration: 500, delay: 500 })
  );

  this.transition(
    this.hasClass('ui-fade-4'),
    this.toValue(true),
    this.use('fade', { duration: 500, delay: 750 }),
    this.reverse('fade', { duration: 500, delay: 750 })
  );

  this.transition(
    this.hasClass('ui-fade-5'),
    this.toValue(true),
    this.use('fade', { duration: 500, delay: 1000 }),
    this.reverse('fade', { duration: 500, delay: 1000 })
  );

  this.transition(
    this.hasClass('ui-fade-6'),
    this.toValue(true),
    this.use('fade', { duration: 500, delay: 1250 }),
    this.reverse('fade', { duration: 500, delay: 1250 })
  );

  this.transition(
    this.hasClass('ui-fade-7'),
    this.toValue(true),
    this.use('fade', { duration: 500, delay: 1500 }),
    this.reverse('fade', { duration: 500, delay: 1500 })
  );
}
