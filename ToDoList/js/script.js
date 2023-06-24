'use strict';

// Select the necessary DOM elements
const inputText = document.querySelector('.ct-input-task');
const addBtn = document.querySelector('.ct-button');
const ctTasks = document.querySelector('.ct-todolist');

// Initialize variables
let tasks = [];
let task = '';
let content = '';

// Function to add tasks to local storage
const addLocalStorage = function (content) {
  const jsonContent = JSON.stringify(content);
  localStorage.setItem('task', jsonContent);
};

// Function to retrieve tasks from local storage
const getLocalStorage = function () {
  const storedString = localStorage.getItem('task');
  const storedValue = JSON.parse(storedString);
  return storedValue;
};

// Function to render tasks
const renderTasks = function (content) {
  let htmlContent = '';

  htmlContent += `<div class="ct-task">
    <p>${content}</p>
    <span class="ct-close-icon">❌</span>
  </div>`;

  ctTasks.insertAdjacentHTML('beforeend', htmlContent);
};

// Function to delete a task
const deleteTask = function () {
  const deleteBtn = document.querySelectorAll('.ct-close-icon');
  deleteBtn.forEach(element => {
    element.addEventListener('click', e => {
      const taskElement = e.target.parentElement;
      const taskIndex = Array.from(deleteBtn).indexOf(element);
      tasks.splice(taskIndex, 1);
      addLocalStorage(tasks);
      taskElement.remove();
    });
  });
};

// Retrieve tasks from local storage
const localStorageTask = getLocalStorage();

// If there are tasks in local storage, render them
if (localStorageTask) {
  tasks = localStorageTask;
  localStorageTask.forEach(element => {
    renderTasks(element);
  });
  deleteTask(); // Call deleteTask after rendering tasks from localStorage
}

// Event listener for the add button
addBtn.addEventListener('click', () => {
  //If input is empty, dont do anything
  if (inputText.value === '') return;
  if (localStorageTask && tasks == '')
    // If there are tasks in local storage and the current tasks array is empty, use the tasks from local storage
    tasks = localStorageTask;

  // Get the new task from the input field
  task = inputText.value;

  // Add the new task to the tasks array and render it
  tasks.push(task);
  renderTasks(task);

  // Add the updated tasks array to local storage
  addLocalStorage(tasks);

  // Attach the deleteTask functionality to the delete buttons
  deleteTask();
});
