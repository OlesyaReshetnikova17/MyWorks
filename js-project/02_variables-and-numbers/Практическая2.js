/*задача 1*/
let x1 = 5;
let y1 = 3;
let x2 = 8;
let y2 = 5;
let x = Math.abs (x2 - x1);
let y = Math.abs (y2 - y1);
console.log(x * y);
/*задача 2*/
let a = 13.123456789;
let b = 2.123;
let n  = 5;
let aNormallezed = Math.floor(a * Math.pow(10, n));
let bNormallezed = Math.floor(b * Math.pow(10, n));

console.log(aNormallezed);
console.log(bNormallezed);


console.log(aNormallezed > bNormallezed);
console.log(aNormallezed < bNormallezed);
console.log(aNormallezed >= bNormallezed);
console.log(aNormallezed <= bNormallezed);
console.log(aNormallezed === bNormallezed);
console.log(aNormallezed !== bNormallezed);
/*задача 3*/

let n = -3;
let m = -10;

let range = Math.abs(m-n);
let min = Math.min(n,m);
let random1 = min + (Math.round(Math.random() * range));
let random2 = min + (Math.round(Math.random() * range));

console.log('Случайное число 1', random1);
console.log('Случайное число 2', random2);