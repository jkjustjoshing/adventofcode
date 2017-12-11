'use strict';

const Rx = require('rxjs/Rx');


let getObservable = () => {
  return Rx.Observable.create(observer => {
    var vector = {
      axis: 0,
      direction: 1
    };
    var index = 1;
    var coordinates = [ 0, 0 ];
    var stop = false

    const increment = () => {
      index++;
      coordinates[vector.axis] = coordinates[vector.axis] + vector.direction;
    }
    const rotate = () => {
      vector.axis = (vector.axis + 1) % 2;
      if (!vector.axis) {
        vector.direction = vector.direction * -1;
      }
    }
    const emit = () => observer.next({ id: index, coordinates: Array.from(coordinates) });

    setTimeout(() => {
      emit()
      increment();
      rotate();
      emit()
      increment();
      rotate();
      for (let i = 2; !stop; i++) {
        for (var j = 0; j < 2 && !stop; ++j) {
          for (var k = 0; k < i; ++k) {
            emit();
            increment();
          }
          rotate();
        }
      }
    }, 0);

    return () => stop = true;
  })
}

let getCoordinates = (max: number) => {

}

module.exports = [
  // Challenge 1
  (input: string) => {
    let number = parseInt(input, 10);
    let subscription = getObservable().subscribe(a => {
      if (a.id === number) {
        subscription.unsubscribe();
        console.log('Result: ', Math.abs(a.coordinates[0]) + Math.abs(a.coordinates[1]));
      }
    });
  },
  (input: string) => {
    let number = parseInt(input, 10);
    return getCoordinates(number);
  }


];
