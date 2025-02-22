
function createStudentsList(listArr) {
  let ol=  document.createElement('ol')
  document.body.append(ol);
let list = [
document.createElement('li'),
document.createElement('li'),
document.createElement('li'),
document.createElement('li'),
document.createElement('li')
]
list[0].textContent = allStudents[0]
list[1].textContent =allStudents[1]
list[2].textContent =allStudents[2]
list[3].textContent =allStudents[3]
list[4].textContent =allStudents[4]
ol.prepend(list[0])
ol.prepend(list[1])
ol.prepend(list[2])
ol.prepend(list[3])
ol.prepend(list[4])
}

 let allStudents=[
  {name: 'Валя', age: 11},
  {name: 'Таня',age: 24},
  {name: 'Рома',age: 21},
  {name: 'Надя', age: 34},
  {name: 'Антон', age: 7}
 ]


 createStudentsList(allStudents)
