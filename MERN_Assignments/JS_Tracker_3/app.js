const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskk");
const clearBtn = document.getElementById("clearAll");
const list = document.getElementById("taskList");
const count = document.getElementById("taskCount");

let tasks = [];

function addTask() {
  const task = input.value.trim();

  if (task.length === 0) {
    alert("Task cannot be empty.");
    return;
  }

  if (tasks.includes(task)) {
    alert("Task already exists.");
    return;
  }

  tasks.push(task);
  renderTasks();
  input.value = "";
  input.focus();
}

function clearAllTasks() {
  tasks.length = 0;
  list.innerHTML = "";
  count.innerText = "0 tasks";
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerText = task;
    list.appendChild(li);
  });

  count.innerText = `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`;
}

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);