const personList = document.getElementById('person-list');
const newPersonInput = document.getElementById('new-person');
const addPersonButton = document.getElementById('add-person');
const habitList = document.getElementById('habit-list');
const habitInput = document.getElementById('habit-name');
const addHabitButton = document.getElementById('add-habit');
const themeToggle = document.getElementById('theme-toggle');

let persons = JSON.parse(localStorage.getItem('persons')) || {};
let currentPerson = null;


function updateLocalStorage() {
  localStorage.setItem('persons', JSON.stringify(persons));
}


function renderPersons() {
  personList.innerHTML = '';
  Object.keys(persons).forEach((person) => {
    const option = document.createElement('option');
    option.value = person;
    option.textContent = person;
    personList.appendChild(option);
  });
  personList.value = currentPerson || '';
}


function renderHabits() {
  habitList.innerHTML = '';
  if (!currentPerson || !persons[currentPerson]) return;

  persons[currentPerson].forEach((habit, index) => {
    const habitElement = document.createElement('li');
    habitElement.classList.add('habit');
    habitElement.innerHTML = `
      <span contenteditable="true" class="habit-name">${habit.name}</span>
      <div class="tracker">
        ${habit.days.map((completed, dayIndex) => `
          <div class="day ${completed ? 'completed' : ''}" data-index="${index}" data-day="${dayIndex}"></div>
        `).join('')}
      </div>
      <button class="delete" data-index="${index}">🗑️</button>
    `;
    habitList.appendChild(habitElement);
  });
}


addPersonButton.addEventListener('click', () => {
  const newPerson = newPersonInput.value.trim();
  if (newPerson && !persons[newPerson]) {
    persons[newPerson] = [];
    currentPerson = newPerson;
    newPersonInput.value = '';
    updateLocalStorage();
    renderPersons();
    renderHabits();
  }
});


personList.addEventListener('change', (e) => {
  currentPerson = e.target.value;
  renderHabits();
});


addHabitButton.addEventListener('click', () => {
  if (!currentPerson) {
    alert('Please select a person first.');
    return;
  }

  const habitName = habitInput.value.trim();
  if (habitName) {
    persons[currentPerson].push({ name: habitName, days: Array(7).fill(false) });
    habitInput.value = '';
    updateLocalStorage();
    renderHabits();
  }
});


habitList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = e.target.getAttribute('data-index');
    persons[currentPerson].splice(index, 1);
    updateLocalStorage();
    renderHabits();
  }
});


habitList.addEventListener('click', (e) => {
  if (e.target.classList.contains('day')) {
    const habitIndex = e.target.getAttribute('data-index');
    const dayIndex = e.target.getAttribute('data-day');
    persons[currentPerson][habitIndex].days[dayIndex] = !persons[currentPerson][habitIndex].days[dayIndex];
    updateLocalStorage();
    renderHabits();
  }
});


themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});


if (!currentPerson && Object.keys(persons).length > 0) {
  currentPerson = Object.keys(persons)[0];
}
const deletePersonButton = document.getElementById('delete-person');

const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

function renderHabits() {
  habitList.innerHTML = '';
  if (!currentPerson || !persons[currentPerson]) return;

  persons[currentPerson].forEach((habit, index) => {
    const habitElement = document.createElement('li');
    habitElement.classList.add('habit');
    habitElement.innerHTML = `
      <span contenteditable="true" class="habit-name">${habit.name}</span>
      <div class="tracker">
        ${habit.days.map((completed, dayIndex) => `
          <div class="day ${completed ? 'completed' : ''}" 
               data-index="${index}" 
               data-day="${dayIndex}" 
               title="${daysOfWeek[dayIndex]}">
            ${daysOfWeek[dayIndex]}
          </div>
        `).join('')}
      </div>
      <button class="delete" data-index="${index}">🗑️</button>
    `;
    habitList.appendChild(habitElement);
  });

  // Add delete functionality
  const deleteButton = habitItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => deleteHabit(habit.name));

  // Add toggle functionality for days
  const dayElements = habitItem.querySelectorAll(".day");
  dayElements.forEach((dayElement, index) => {
    dayElement.addEventListener("click", () => toggleDay(habit.name, index));
  });

  habitList.appendChild(habitItem);
}


deletePersonButton.addEventListener('click', () => {
  if (!currentPerson) {
    alert('Please select a person to delete.');
    return;
  }


  const confirmDelete = confirm(`Are you sure you want to delete ${currentPerson}?`);
  if (confirmDelete) {
    delete persons[currentPerson];
    currentPerson = null;


    updateLocalStorage();
    renderPersons();
    renderHabits();
  }
});


function renderPersons() {
  personList.innerHTML = '<option value="" disabled selected>Select a person</option>';
  Object.keys(persons).forEach((person) => {
    const option = document.createElement('option');
    option.value = person;
    option.textContent = person;
    personList.appendChild(option);
  });


  if (!Object.keys(persons).length) {
    currentPerson = null;
  }

  personList.value = currentPerson || '';
}


if (!currentPerson && Object.keys(persons).length > 0) {
  currentPerson = Object.keys(persons)[0];
}
renderPersons();
renderHabits();
