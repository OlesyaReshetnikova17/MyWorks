/*1 задача*/

getAge(1998)

getAge(1991)

getAge(2007)



function getAge(age) {

let currentDate = new Date()

let currentYear = currentDate.getFullYear()



return (currentYear - age);

}

console.log(getAge(2000));




/*задача 2*/

function filter(whiteList,blackList) {
const filteremails = [];
for (let i = 0; i < whiteList.length; i++) {
    if (!blackList.includes(whiteList[i])){
        filteremails.push(whiteList[i])
    }
}
return filteremails;
    }

let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];

    let result = filter(whiteList,blackList);
    console.log(result);

/*3 задача*/

let arr = [2,5,1,3,4]

function arrSort(arr) {
for (i = 0; i < arr.length; i++) {
for (j = 0; j < arr.length - 1; j++) {
if (arr[j] > arr[j + 1]) {
let temp = arr[j]
arr[j] = arr[j + 1]
arr[j + 1] = temp
}
}
}
return arr;
}
console.log(arrSort(arr));


