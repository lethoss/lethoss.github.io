



function Transport(name,capacity,fuel) {
  this.name=name;
  this.capacity=capacity;
  this.fuel=fuel;
};

Transport.prototype.doclad=function () {
  let s='Транспорт ' + this.name  +' вмещает ' + this.capacity + ' человек и работает на топливе - '  + this.fuel +'.';
    console.log(s);
    return s;
};
function WheeledTransport(name,capacity,fuel,numberOfAxles,driveUnit) {
  Transport.call(this,name,capacity,fuel);

  this.numberOfAxles = numberOfAxles;
  this.driveUnit = driveUnit;
}
WheeledTransport.prototype = Object.create(Transport.prototype);
Object.defineProperty(WheeledTransport.prototype, 'constructor', {
    value: WheeledTransport,
    enumerable: false,
    writable: true });

  WheeledTransport.prototype.doclad=function () {
    let s='Транспорт ' + this.name  +' вмещает ' + this.capacity + ' человек и работает на топливе - '  + this.fuel +'. Подходит только для работы на асфальте.';
    if ((this.numberOfAxles + 'x' + this.numberOfAxles == this.driveUnit) || (this.numberOfAxles + 'х' + this.numberOfAxles == this.driveUnit)) {
      s='Транспорт ' + this.name  +' вмещает ' + this.capacity + ' человек и работает на топливе - '  + this.fuel +'. Может перемещаться по бездорожью, так как имеет полный привод.';
  }
console.log(s);
return s;
};
function TrackedTransport(name,capacity,fuel,permission) {
  Transport.call(this,name,capacity,fuel);
  this.permission = permission;
}
TrackedTransport.prototype = Object.create(Transport.prototype);
Object.defineProperty(TrackedTransport.prototype, 'constructor', {
    value: TrackedTransport,
    enumerable: false,
    writable: true });

    TrackedTransport.prototype.doclad=function () {
      let s='Транспорт ' + this.name  +' вмещает ' + this.capacity + ' человек и работает на топливе - '  + this.fuel +'. Только для перемещения вне дорог';
    if (this.permission)  s='Транспорт ' + this.name  +' вмещает ' + this.capacity + ' человек и работает на топливе - '  + this.fuel +'. По дорогам общего пользования может перемещаться.';
  console.log(s);
  return s;
    };
