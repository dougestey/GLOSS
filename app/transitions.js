export default function(){
  /* Routes */
  this.transition(
    this.includingInitialRender(),
    this.outletName('main'),
    this.useAndReverse('fade', { duration: 250 })
  );

  /* Binds */
  for (let i = 0; i < 10; i++) {
    this.transition(
      this.hasClass(`ui-fade-${i}`),
      this.useAndReverse('fade', { duration: 500, delay: 250 * i })
    );
  }

  this.transition(
    this.includingInitialRender(),
    this.hasClass('ui-fade'),
    this.use('fade', { duration: 250 })
  );

  this.transition(
    this.includingInitialRender(),
    this.hasClass('ui-slide-from-top'),
    this.use('toDown', { duration: 250 })
  );
}
