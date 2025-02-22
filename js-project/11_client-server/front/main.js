document.addEventListener("DOMContentLoaded", async() => {
  const SERVER_URL = 'http://localhost:3000'

  async function serverAddStudent(Object) {
      let response = await fetch(SERVER_URL + '/api/students', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object),
      })

      let data = await response.json()

      return data
  }

  async function serverGetStudents() {
      let response = await fetch(SERVER_URL + '/api/students/' , {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
      })

      let data = await response.json()

      return data
  }


  async function serverDeleteStudent(id) {
      let response = await fetch (SERVER_URL + '/api/students/' + id, {
          method: "DELETE",
      })

      let data = await response.json()

      return data
  }


  let serverData = await serverGetStudents()


  let listStudents = []

  if (serverData) {
      listStudents = serverData;
  }


   function renderStudentsTable(arr) {
      let copyArr = [...arr]

      const studTable = document.getElementById("table-body")


      studTable.innerHTML = ''
      for (const studentObj of copyArr) {
          const $newTr = getStudentItem(studentObj)
          studTable.append($newTr)
      }renderStudentsTable(listStudents)
  }




    const filterForm = document.getElementById('filters'),
      filterInpFio = document.getElementById('filters__fio-inp'),
      filterInpFaculty = document.getElementById('filters__faculty-inp'),
      filterInpStartEduYear = document.getElementById('filters__start-education-year-inp'),
      filterInpEndEduYear = document.getElementById('filters__end-education-year-inp');

    function formatDate(dateServer) {
      let date = new Date (dateServer)
      let dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      let yy = date.getFullYear();
      if (yy < 10) yy = '0' + yy;

      return dd + '.' + mm + '.' + yy;
    }

    function calculateAge(birthday) {
      const birthDate = new Date(birthday);
      const differenceInMS = Date.now() - birthDate.getTime();
      const ageDate = new Date(differenceInMS);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // Local Storage
    function getLocalStudents() {
      const localStudents = localStorage.getItem('students list');
      if (localStudents) {
        // преобразовать birthday к дате обратно при получении из local storage
        listStudents = JSON.parse(localStudents).map(student => {
          student.birthday = new Date(student.birthday);
          student.studyStart = Number(student.studyStart);
          return student;
        });
      }
      renderStudentsTable(listStudents)
    }

    function setLocalStudents(arr) {
      localStorage.setItem('students list', JSON.stringify(arr));
      getLocalStudents(); // таблица обновится с новым студентом при перезагрузки страницы
      console.log('students were set to local storage');
    }


    // Функция вывода одного студента в таблицу
    // Create one student tr item and fill it with data

    function getStudentItem(studentObj) {
      const tr = document.createElement('tr');
      const tdFio = document.createElement('td'),
        tdFaculty = document.createElement('td'),
        tdBirthday = document.createElement('td'),
        tdEducation = document.createElement('td');
        const tdDelete = document.createElement("td")
        const btnDelete = document.createElement("button")

        btnDelete.classList.add("btn", "btn-danger", "w-100")
        btnDelete.textContent = "Удалить"


        btnDelete.addEventListener("click", async function() {
            await serverDeleteStudent(studentObj.id)
            tr.remove()
        })

        tdDelete.append(btnDelete)
        tr.append(tdFio, tdBirthday, tdFaculty, tdEducation, tdDelete)


      // fill student data
      tdFio.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.lastname}`;
      tdFaculty.textContent = studentObj.faculty;

      // student birthday
      const formattedBirthDate = formatDate(studentObj.birthday);
      const studentCurrentAge = calculateAge(studentObj.birthday);
      tdBirthday.textContent = `${formattedBirthDate} (${studentCurrentAge} лет)`; // for table rendering

      // study years
      const endEducationYear = parseInt(studentObj.studyStart) + 4;
      const currentYear = new Date().getFullYear();
      const studentCourse = currentYear - studentObj.studyStart;

      studentObj.endEducationYear = endEducationYear;


      // Проверить если сентябрь года окончания обучения уже прошёл
      if (currentYear > endEducationYear || (currentYear === endEducationYear && new Date().getMonth() > 8)) {
        tdEducation.textContent = `${studentObj.studyStart}-${endEducationYear} (закончил)`;
      } else {
        tdEducation.textContent = `${studentObj.studyStart}-${endEducationYear} (${studentCourse} курс)`;
      }

      tr.append(tdFio, tdFaculty, tdBirthday, tdEducation, tdDelete);
      return tr;
    }

    // Filter functions
    function filter(arr, prop, value) {
      return arr.filter(function(student) {
        if (student[prop].toLowerCase().includes(value.trim().toLowerCase())) return true;
      });
    }

    function filterByNumber(arr, prop, value) {
      return arr.filter(function(student) {
        if (student[prop] === Number(value)) return true;
      });
    }


    // Функция отрисовки всех студентов -- Render

    function renderStudentsTable(studentsArray) {
      let copyArr = [...studentsArray];

      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';


      // Объединить ФИО в одно свойство
      listStudents.forEach(student => {
        student.fio = [student.surname, student.name, student.lastname].filter(Boolean).join(' ');
      });

      // FILTER
      // Ф. И. О. для поиска подстроки в фамилии, имени или отчестве.
      if (filterInpFio.value.trim() !== '') {
        copyArr = filter(copyArr, 'fio', filterInpFio.value);
      }
      // Факультет для поиска подстроки в названии факультета
      if (filterInpFaculty.value.trim() !== '') {
        copyArr = filter(copyArr, 'faculty', filterInpFaculty.value);
      }
      // Год начала обучения (точное совпадение)
      if (filterInpStartEduYear.value) {
        copyArr = filterByNumber(copyArr, 'studyStart', filterInpStartEduYear.value);
      }
      // Год окончания обучения (точное совпадение)
      if (filterInpEndEduYear.value) {
        copyArr = filterByNumber(copyArr, 'endEducationYear', filterInpEndEduYear.value);
      }

      for (const studentObj of copyArr) {
        const createdTr = getStudentItem(studentObj);
        tableBody.append(createdTr);
      }
    }

    renderStudentsTable(listStudents);


    // К форме добавления студента добавить слушатель события отправки формы, в котором будет проверка введенных данных
    // Если проверка пройдет успешно, добавить объект с данными студентов в массив студентов

    // предупреждение о незаполненном поле для ввода. Validation alerts
    function validationFormFailed(inputContainerIdStr, inputElement, message) {
      const field = document.getElementById(inputContainerIdStr);

      // предотвратить дублирование span предупреждений при переотправке незаполненной формы
      const spanAlerts = field.getElementsByClassName('invalid-feedback');
      while (spanAlerts.length > 0) {
        spanAlerts[0].remove();
      }

      const span = document.createElement('span');
      span.textContent = 'Поле обязательное для заполнения'; // template message
      if (message) {
        span.textContent = message;
      }

      span.classList.add('invalid-feedback');
      inputElement.classList.toggle('is-invalid');
      field.append(span);
    }

    // Добавление студента и валидация формы
    document.getElementById('new-student-form').addEventListener('submit',async function(e) {
      e.preventDefault();

      let nameInp = document.getElementById('name-input'),
        surnameInp = document.getElementById('surname-input'),
        lastnameInp = document.getElementById('lastname-input'),
        birthdayInp = document.getElementById('birthday-input'),
        educationInp = document.getElementById('start-education-year-input'),
        facultyInp = document.getElementById('faculty-input');

      let newStudentObj = {
        name: nameInp.value.trim(),
        surname: surnameInp.value.trim(),
        lastname: lastnameInp.value.trim(),
        birthday: new Date(birthdayInp.value),
        studyStart: educationInp.value,
        faculty: facultyInp.value.trim(),
      }

        console.log(listStudents);
        renderStudentsTable(listStudents);



      // Text validations
      switch (true) {
        case (newStudentObj.name.trim() === ''):
          validationFormFailed('name-field', nameInp, 'Введите имя');
          return;
        case (newStudentObj.surname.trim() === ''):
          validationFormFailed('surname-field', surnameInp, 'Введите фамилию');
          return;
        case (newStudentObj.lastname.trim() === ''):
          validationFormFailed('lastname-field', lastnameInp, 'Введите отчество');
          return;
        case (newStudentObj.faculty.trim() === ''):
          validationFormFailed('faculty-field', facultyInp, 'Заполните факультет');
          return;
      }

      // Date validations
       function validateDateRangeTillNow(typedValue, minDate) {
        const min = new Date(minDate);
        const currentYear = new Date();

        return ((typedValue >= min) && (typedValue <= currentYear)); // => true or false
      }

      if (!validateDateRangeTillNow( newStudentObj.birthday, (1900, 0, 1) )) {
        validationFormFailed('bday-field', birthdayInp, 'Введите дату рождения в диапазоне от 01.01.1900 до текущей даты');
        return;
      }

      if (!validateDateRangeTillNow( newStudentObj.studyStart, 2000 )) {
        validationFormFailed('education-field', educationInp, 'Введите дату, начало обучения не ранее 2000 года');
        return;
      }

      let serverDataObj = await serverAddStudent(newStudentObj)

      serverDataObj.birthday = new Date(serverDataObj.birthday)

      listStudents.push(serverDataObj)

      console.log(listStudents);

      renderStudentsTable(listStudents);

      const newStudentInputs = document.querySelectorAll('#new-student-form input');
      newStudentInputs.forEach((input) => {
        input.classList.remove('is-invalid');
        input.value = '';
      });

    // Сортировка по клику на заголовок колонки th
  });

    const thFio = document.getElementById('th-fio'),
      thFaculty = document.getElementById('th-faculty'),
      thBirthday = document.getElementById('th-birthday'),
      thEducationYears = document.getElementById('th-education-years');



    function sortOnClick(element, sortColumnKey, isSorted) {
      element.addEventListener('click', () => {
        isSorted = !isSorted;
        let sortadList = listStudents.toSorted((a, b) =>
        isSorted
        ? ("" + a[sortColumnKey]).localeCompare(b[sortColumnKey])
        : ("" + b[sortColumnKey]).localeCompare(a[sortColumnKey])
        );
        console.log(sortadList);
        renderStudentsTable(sortadList);
      });
    }
    let isSorted = false;

    sortOnClick(thFio, 'fio', isSorted);
    sortOnClick(thFaculty, 'faculty', isSorted);
    sortOnClick(thBirthday, 'birthday', isSorted);
    sortOnClick(thEducationYears, 'studyStart', isSorted);

    // Фильтрация массива студентов и добавление событий для элементов формы

    filterForm.addEventListener('submit', function(e) {
      e.preventDefault();
    });

    filterInpFio.addEventListener('input', function() {
      renderStudentsTable(listStudents);
    });

    filterInpFaculty.addEventListener('input', function() {
      renderStudentsTable(listStudents);
    });

    filterInpStartEduYear.addEventListener('input', function() {
      renderStudentsTable(listStudents);
    });

    filterInpEndEduYear.addEventListener('input', function() {
      renderStudentsTable(listStudents);
    });


  });
