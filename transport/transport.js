function Transport(name,vmestimost,toplivo) {
  this.name=name;
  this.vmestimost=vmestimost;
  this.toplivo=toplivo;
};
Transport.prototype.doclad=function () {
    console.log('Транспорт ' + this.name  +' вмещает ' + this.vmestimost + ' человек и работает на топливе - '  + this.toplivo +'.');

};
function TransportKolesniy(name,vmestimost,toplivo,kolichestvo_osey,privod) {
  Transport.call(this,name,vmestimost,toplivo);

  this.kolichestvo_osey = kolichestvo_osey;
  this.privod = privod;
}
TransportKolesniy.prototype = Object.create(Transport.prototype);
Object.defineProperty(TransportKolesniy.prototype, 'constructor', {
    value: TransportKolesniy,
    enumerable: false,
    writable: true });

  TransportKolesniy.prototype.doclad=function () {
    if (this.kolichestvo_osey + 'x' + this.kolichestvo_osey == this.privod) {
      console.log('Транспорт ' + this.name  +' вмещает ' + this.vmestimost + ' человек и работает на топливе - '  + this.toplivo +'. Может перемещаться по бездорожью, так как имеет полный привод.');
  }
  else console.log('Транспорт ' + this.name  +' вмещает ' + this.vmestimost + ' человек и работает на топливе - '  + this.toplivo +'. Подходит только для работы на асфальте.');
};
function TransportNaGusenizach(name,vmestimost,toplivo,razreshenie) {
  Transport.call(this,name,vmestimost,toplivo);
  this.razreshenie = razreshenie;
}
TransportNaGusenizach.prototype = Object.create(Transport.prototype);
Object.defineProperty(TransportNaGusenizach.prototype, 'constructor', {
    value: TransportNaGusenizach,
    enumerable: false,
    writable: true });

    TransportNaGusenizach.prototype.doclad=function () {
    if (this.razreshenie)    console.log('Транспорт ' + this.name  +' вмещает ' + this.vmestimost + ' человек и работает на топливе - '  + this.toplivo +'. По дорогам общего пользования может перемещаться.');
    else console.log('Транспорт ' + this.name  +' вмещает ' + this.vmestimost + ' человек и работает на топливе - '  + this.toplivo +'. Только для перемещения вне дорог');
    };
  let transport1=new Transport('Tramvai',30,'electric');
  let transport2=new TransportKolesniy('Avtobus',20,'diesel',2,'2x2');
  let transport3=new TransportNaGusenizach('BMP',6,'diesel',false);
