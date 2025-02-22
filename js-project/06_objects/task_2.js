let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
   ]
   
   function  filter(objects, searchKey, searchValue){
       let result = [];
       for (i = 0; i < objects.length; i++) {
           let obj = objects[i];
           if (obj[searchKey] === searchValue) result.push(obj);
       }
       return result;
   }
   
    let result = filter(objects, 'name', 'Иван');
    console.log(result);