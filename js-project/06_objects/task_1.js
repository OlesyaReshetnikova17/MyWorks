/*задача 1*/

let allUsers=[
    {
      name: 'Игорь',
      age: 17
    },
    
    {
      name: 'Оля',
      age: 21
    }
  ]
  function getOlderUserArray(usersArray){
    let arr = [];
    for(let i of usersArray){
      arr.push(i.age);
    }
    let obj = usersArray.filter( item => item.age >= Math.max(...arr))[0].name
  
    return obj;
  }
  
  console.log(getOlderUserArray(allUsers))