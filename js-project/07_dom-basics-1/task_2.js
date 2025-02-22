
 function createStudentCard(studentObj) {
  let div=  document.createElement('div')
  document.body.append(div);

  let h1 = document.createElement('h1')
  h1.textContent = studentObj.name;
  document.body.append(h1);

  let span = document.createElement('span')
  span.textContent = studentObj.age;
  document.body.append(span);
  }
  let studentObj={
  name: 'Игорь',
  age: 17
 }
  createStudentCard(studentObj);

