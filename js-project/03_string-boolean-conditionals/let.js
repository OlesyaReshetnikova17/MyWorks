/*задача 1*/
let password = '1234_';

if (password.length >= 4 &&  (password.includes('-') || password.includes('_'))) {
    console.log('Пароль надежный')}
else {
    console.log('Пароль недостаточно надежный')
}

/*задача 2*/
let userName = "ОЛЕСЯ"
let userSurname = "РЕШЕТНИКОВА"

let normName = userName.substring(0,1).toLowerCase() + userName.substring(1).toLowerCase();
let normSurname = userSurame.substring(0,1).toLowerCase() + userSurname.substring(1).toLowerCase();

console.log (normName, normSurname);
/*задача 3*/

let number = 7

if (number % 2 == 0) {
  console.log("Число &{number} четное");
}
else {
  console.log('Число &{number} нечетное');
}
