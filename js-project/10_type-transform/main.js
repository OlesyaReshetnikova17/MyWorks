document.addEventListener('DOMContentLoaded', () => {
  let studentsList = [
      {
        name: 'Патицин',
        surname: 'Сергей',
        patronymic: 'Андреевич',
        birthday: new Date(1983, 6, 17),
        startEducationYear: 2018,
        faculty: 'Сливщик-разливщик',
      },
      {
        name: 'Санникова',
        surname: 'Елена',
        patronymic: 'Николаевна',
        birthday: new Date(1984, 10, 11),
        startEducationYear: 2020,
        faculty: 'Инженерное проектирование',
      },
      {
        name: 'Татаркин',
        surname: 'Вячеслав',
        patronymic: 'Васильевич',
        birthday: new Date(1963, 1, 11),
        startEducationYear: 2021,
        faculty: 'Механика и автоматизация',
      },
      {
        name: 'Решетникова',
        surname: 'Олеся',
        patronymic: 'Сергеевна',
        birthday: new Date(2000, 9, 1),
        startEducationYear: 2018,
        faculty: 'Природообустройство',
      },
  ];

  let sortColumn = 'fio';
  let sortDirection = true;

  const filterForm = document.getElementById('filters'),
    filterInpFio = document.getElementById('filters__fio-inp'),
    filterInpFaculty = document.getElementById('filters__faculty-inp'),
    filterInpStartEduYear = document.getElementById('filters__start-education-year-inp'),
    filterInpEndEduYear = document.getElementById('filters__end-education-year-inp');

  function formatDate(date) {
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
      studentsList = JSON.parse(localStudents).map(student => {
        student.birthday = new Date(student.birthday);
        student.startEducationYear = Number(student.startEducationYear);
        return student;
      });
    }
    renderStudentsTable(studentsList)
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

    // fill student data
    tdFio.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.patronymic}`;
    tdFaculty.textContent = studentObj.faculty;

    // student birthday
    const formattedBirthDate = formatDate(studentObj.birthday);
    const studentCurrentAge = calculateAge(studentObj.birthday);
    tdBirthday.textContent = `${formattedBirthDate} (${studentCurrentAge} лет)`; // for table rendering

    // study years
    const endEducationYear = parseInt(studentObj.startEducationYear) + 4;
    const currentYear = new Date().getFullYear();
    const studentCourse = currentYear - studentObj.startEducationYear;

    studentObj.endEducationYear = endEducationYear;

    // Проверить если сентябрь года окончания обучения уже прошёл
    if (currentYear > endEducationYear || (currentYear === endEducationYear && new Date().getMonth() > 8)) {
      tdEducation.textContent = `${studentObj.startEducationYear}-${endEducationYear} (закончил)`;
    } else {
      tdEducation.textContent = `${studentObj.startEducationYear}-${endEducationYear} (${studentCourse} курс)`;
    }

    tr.append(tdFio, tdFaculty, tdBirthday, tdEducation);
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
    studentsList.forEach(student => {
      student.fio = [student.surname, student.name, student.patronymic].filter(Boolean).join(' ');
    });

    // SORT
    copyArr = copyArr.sort((a, b) => {
      return sortDirection ? (a[sortColumn] > b[sortColumn] ? -1 : 0) : (a[sortColumn] < b[sortColumn] ? -1 : 0);
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
      copyArr = filterByNumber(copyArr, 'startEducationYear', filterInpStartEduYear.value);
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

  renderStudentsTable(studentsList);


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
  document.getElementById('new-student-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInp = document.getElementById('name-input'),
      surnameInp = document.getElementById('surname-input'),
      patronymicInp = document.getElementById('patronymic-input'),
      birthdayInp = document.getElementById('birthday-input'),
      educationInp = document.getElementById('start-education-year-input'),
      facultyInp = document.getElementById('faculty-input');

    const newStudentObj = {
      name: nameInp.value.trim(),
      surname: surnameInp.value.trim(),
      patronymic: patronymicInp.value.trim(),
      birthday: new Date(birthdayInp.value),
      startEducationYear: educationInp.value,
      faculty: facultyInp.value.trim(),
    };

    // Text validations
    switch (true) {
      case (newStudentObj.name.trim() === ''):
        validationFormFailed('name-field', nameInp, 'Введите имя');
        return;
      case (newStudentObj.surname.trim() === ''):
        validationFormFailed('surname-field', surnameInp, 'Введите фамилию');
        return;
      case (newStudentObj.patronymic.trim() === ''):
        validationFormFailed('patronymic-field', patronymicInp, 'Введите отчество');
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

    if (!validateDateRangeTillNow( newStudentObj.startEducationYear, 2000 )) {
      validationFormFailed('education-field', educationInp, 'Введите дату, начало обучения не ранее 2000 года');
      return;
    }

    studentsList.push(newStudentObj);
    setLocalStudents(studentsList);
    renderStudentsTable(studentsList);

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

  function sortOnClick(element, sortColumnKey) {
    element.addEventListener('click', () => {
      sortColumn = sortColumnKey;
      sortDirection = !sortDirection;
      renderStudentsTable(studentsList);
    });
  }

  sortOnClick(thFio, 'fio');
  sortOnClick(thFaculty, 'faculty');
  sortOnClick(thBirthday, 'birthday');
  sortOnClick(thEducationYears, 'startEducationYear');

  // Фильтрация массива студентов и добавление событий для элементов формы

  filterForm.addEventListener('submit', function(e) {
    e.preventDefault();
  });

  filterInpFio.addEventListener('input', function() {
    renderStudentsTable(studentsList);
  });

  filterInpFaculty.addEventListener('input', function() {
    renderStudentsTable(studentsList);
  });

  filterInpStartEduYear.addEventListener('input', function() {
    renderStudentsTable(studentsList);
  });

  filterInpEndEduYear.addEventListener('input', function() {
    renderStudentsTable(studentsList);
  });

  getLocalStudents();
});
