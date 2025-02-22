let allStudents=[
  {name: 'Валя', age: 11},
  {name: 'Таня',age: 24},
  {name: 'Рома',age: 21},
  {name: 'Надя', age: 34},
  {name: 'Антон', age: 7}
 ]

 let list = document.querySelector('.btn')
 list.addEventListener('click', function createStudentsList() {
  let studentslist = document.createElement ('ul');

  document.body.append(studentslist);

  for (let i = 0; i < allStudents.length; ++i) {
    let studentslistcard = document.createElement('li')
    let studentslistname = document.createElement('h2');
    let studentslistage = document.createElement('span');
    studentslistname.textContent = allStudents[i].name;
    studentslistage.textContent = "Возраст: ${allStudents[i].age} лет";

    studentslist.append(studentslistcard);
    studentslistcard.append(studentslistname);
    studentslistcard.append(studentslistage);
  }
 })
