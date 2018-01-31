export default function(){
  this.transition(
    this.fromRoute('welcome'),
    this.toRoute('authorize'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
}
