//Define UI variables

const form = document.getElementById("task-form");
const taskList = document.querySelector("ul.collection");
const clearBtn = document.querySelector(".clear-tasks");
const taskFilter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
// loadEventListeners();

// function loadEventListeners() {
//   form.addEventListener("submit", addTask);
// }

form.addEventListener("submit", addTask);

taskList.addEventListener("click", removeTask);

clearBtn.addEventListener("click", clearTasksList);

taskFilter.addEventListener("keyup", filterTasks);

document.addEventListener("DOMContentLoaded", getTasks);

//Get tasks from Local storage
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

//Add new task to list
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Input any task!");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    li.appendChild(link);

    taskList.appendChild(li);

    //Store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
  }
}

//Store task in Local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove task from list
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalSTorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove task from Locale storage
function removeTaskFromLocalSTorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove all tasks from list
function clearTasksList() {
  while (taskList.firstChild != null) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const itemText = task.firstChild.textContent;

    if (itemText.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
