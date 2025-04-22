const newTask = document.querySelector("#new-task"); 
const addTaskBtn = document.querySelector("button");
const taskList = document.querySelector("#task-list"); 
const completedTask = document.querySelector("#completed-tasks");
const arrowUp = document.querySelector(".icon-up");
const arrowDown = document.querySelector(".icon-down");

const taskAddition = (e) => {
  e.preventDefault(); 
  const taskText = newTask.value.trim();

  if (taskText === "") return; 
  
  const newList = document.createElement("li");
  newList.classList.add("task-item");
  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = taskText;
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="trash-icon" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6L17.5 20H6.5L5 6"></path>
      <path d="M10 11V17"></path>
      <path d="M14 11V17"></path>
      <path d="M9 6V4H15V6"></path>
    </svg>`;

  deleteBtn.addEventListener("click", () => {
    completedTask.appendChild(newList);
    newList.classList.add("completed");
  });

  newList.appendChild(textSpan);
  newList.appendChild(deleteBtn);

  taskList.appendChild(newList);
  newTask.value = ""; 
};

addTaskBtn.addEventListener("click", taskAddition);

const toggleTasks = () => {
  completedTask.classList.toggle("show-tasks");
  arrowUp.style.display = completedTask.classList.contains("show-tasks")
    ? "inline"
    : "none";
  arrowDown.style.display = completedTask.classList.contains("show-tasks")
    ? "none"
    : "inline";
};

arrowUp.addEventListener("click", toggleTasks);
arrowDown.addEventListener("click", toggleTasks);

document.querySelectorAll(".task-item .delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".task-item");
    completedTask.appendChild(parent);
    parent.classList.add("completed");
  });
});

const searchInput = document.querySelector("#search-task");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const tasks = document.querySelectorAll("#task-list li");

  tasks.forEach((task) => {
    const taskText = task.querySelector(".task-text").textContent.toLowerCase();

    task.style.display = taskText.includes(searchTerm) ? "flex" : "none";
  });

  const completedTasks = document.querySelectorAll("#completed-tasks li");
  completedTasks.forEach((task) => {
    const taskText = task.querySelector(".task-text").textContent.toLowerCase();
    task.style.display = taskText.includes(searchTerm) ? "flex" : "none";
  });
});
