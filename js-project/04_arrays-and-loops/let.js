/*задача 1*/
let nambers =  [];
let n = -2;
let m = -10;
let count = 40;

let min = Math.min(n,m);
let max = Math.max(n,m);
let range = Math.ads(max - min);

for (i= 0; i <=count-1; i++){
  numbers.push(Math.floor(Math.random() * (range + 1) + min));
}
console.log(numbers);
/*задача 2*/
let array = [2,8,4,3,4];
let n = 3;
let index = -1;
 for (i in array) {
  let element = array[i];
  if (element === n) {
    index = 1;
    console.log('Элемент ${n} найден. Индекс ${index}');
    break
  }
 }
 if (index === -1) {
  console.log('Элемент не найден')
 }

/*задача 3*/
let namber = 5;
let decet =  []
let i = 5;
for (let i = 1; i<= count; i++) {
 decent.push(i)
}
while (--i > 0) {
 let randIndex =  Math.floor(Math.random() * (i + 1));
 [decent [randIndex], decent [i]] =  [decent [i], decent [randIndex]]
}
console.log(decent);

/*задача 4*/
let arr1 =  [2, 2, 17, 21, 45, 12, 54, 31, 53];
let arr2 =  [12, 44, 23, 5];
let arr =  []
for (i = 0; i < arr1.leanght + arr2.length; i++) {
  if (i < arr1.length) {
    arr.push(arr1[i]);
  }
  else{
    arr.push(arr2[i - arr1.length]);
  }
}
console.log(arr);












