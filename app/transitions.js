export default function(){
  /* Routes */
  this.transition(
    this.includingInitialRender(),
    this.outletName('main'),
    this.useAndReverse('fade', { duration: 500 })
  );

  /* Binds */
  for (let i = 0; i < 7; i++) {
    this.transition(
      this.hasClass(`ui-fade-${i}`),
      this.useAndReverse('fade', { duration: 500, delay: 250 * i })
    );
  }

  this.transition(
    this.hasClass('ui-fade'),
    this.useAndReverse('fade', { duration: 250 })
  );

  this.transition(
    this.hasClass('ui-fade'),
    this.toValue(true),
    this.useAndReverse('fade', { duration: 250 })
  );
}
