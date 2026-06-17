const tasksContainer = document.querySelector(".tasks-container");
const addButton = document.querySelector(".add");
const formBG = document.querySelector(".form");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const categories = document.querySelector("#categories");
const submitBtn = document.querySelector(".submit");
const closeForm = document.querySelector(".close-form");
const rootEL = document.documentElement;
const theme = document.querySelector(".theme");
const themeBtn = document.querySelector(".theme-btn");
const heading = document.querySelector(".heading");
const explanation = document.querySelector(".explanation");

theme.addEventListener("click", () => {
  if (theme.dataset.theme == "dark") {
    rootEL.style.setProperty("--dark", "#f0f0f0");
    rootEL.style.setProperty("--light", "#cfcfcf");
    rootEL.style.setProperty("--text-white", "#1a1a1a");
    rootEL.style.setProperty("--text-smooth", "#202020");
    rootEL.style.setProperty("--blue-smooth", "#b44200");
    theme.style.backgroundColor = "#1a1a1a";
    themeBtn.style.backgroundColor = "#bdbdbd";
    themeBtn.style.marginLeft = "auto";
    themeBtn.style.marginRight = "0rem";
    theme.dataset.theme = 'light'
    // heading.style.fontWeight = '800'


    return;
  }

  rootEL.style.setProperty("--dark", "#0f0f0f");
    rootEL.style.setProperty("--light", "#1a1a1a");
    rootEL.style.setProperty("--text-white", "#FFFFFF");
    rootEL.style.setProperty("--text-smooth", "#eeeeee");
    rootEL.style.setProperty("--blue-smooth", "#00a2ffb0");
  theme.style.backgroundColor = "#dbdbdb";
  themeBtn.style.backgroundColor = "#1a1a1a";
  themeBtn.style.marginRight = "auto";
  themeBtn.style.marginLeft = "0rem";
  theme.dataset.theme = 'dark'
  // heading.style.fontWeight = '600'

});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let index = null;

function renderTasks() {
  tasksContainer.innerHTML = "";

  if(tasks.length == 0){
    tasksContainer.innerHTML = `<div class="empty-container">No Tasks Available</div>`
    return 
  }

  const notStarted = tasks.filter((t) => t.status == "Not Started");
  const inProgress = tasks.filter((t) => t.status == "In - Progress");
  const completed = tasks.filter((t) => t.status == "Completed");

  const aranged = [...inProgress, ...notStarted, ...completed];

  aranged.forEach((task) => {
    tasksContainer.innerHTML += `<div data-id="${task.id}" data-status="${task.status}" data-category="${task.category}" class="task">
                    <div class="task-left">
                        <h3>${task.title}</h3>
                        <h5>${task.category}</h5>
                    </div>
                    <div class="current-status ${task.status == "Not Started" ? "not-started" : task.status == "In - Progress" ? "in-progress" : task.status.toLowerCase()}">${task.status}</div>
                    <div class="task-right">
                        <span onclick="more(this)" class="more">...</span>
                        <div class="options hidden">
                            <span onclick="edit(this)" class="edit">Edit</span>
                            <span onclick="deleteTask(this)" class="delete">Delete</span>
                            <div class="status-container">
                                <span onmouseover="statusBtn(this)" class="status-btn">Status</span>
                                <div class="status hidden">
                                    <span onclick="setStatus(this)" class="not-started">Not Started</span>
                                    <span onclick="setStatus(this)" class="in-progress">In - Progress</span>
                                    <span onclick="setStatus(this)" class="completed">Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
  });
}

renderTasks();

addButton.addEventListener("click", () => {
  formBG.style.display = "flex";
});

closeForm.addEventListener("click", () => {
  form.reset();
  formBG.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (title.value.trim() == "") {
    alert("All fields are required");
    return;
  }

  const obj = {
    id: tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.value,
    status: "Not Started",
    category: categories.value,
  };

  if (index) {
    const task = tasks.find((t) => t.id == index);

    task["title"] = obj.title;
    task["category"] = obj.category;
    
    index = null
  } else {
    tasks.push(obj);
  }

  form.reset();
  formBG.style.display = "none";
  setLocalStorage();

  renderTasks();
});

function more(btn) {
  const task = btn.closest(".task");
  const options = task.querySelector(".options");
  const status = task.querySelector(".status");
  options.classList.toggle("hidden");

  if (!status.classList.contains("hidden")) {
    status.classList.add("hidden");
  }
}

const statusBtn = (btn) => {
  const task = btn.closest(".task");
  const status = task.querySelector(".status");
  status.classList.remove("hidden");
};

const setStatus = (btn) => {
  const task = btn.closest(".task");
  const chosen = btn.textContent;
  const status = task.querySelector(".current-status");
  const options = task.querySelector(".options");
  const statusEL = task.querySelector(".status");
  status.textContent = chosen;
  task.dataset.status = chosen;

  if (chosen == "Not Started") {
    status.classList.remove("in-progress");
    status.classList.remove("completed");
    status.classList.add("not-started");
    options.classList.add("hidden");
    statusEL.classList.add("hidden");

    const elem = tasks.find((t) => t.id == task.dataset.id);
    elem.status = chosen;

    setLocalStorage();
    renderTasks();
  } else if (chosen == "In - Progress") {
    status.classList.add("in-progress");
    status.classList.remove("completed");
    status.classList.remove("not-started");
    options.classList.add("hidden");
    statusEL.classList.add("hidden");

    const elem = tasks.find((t) => t.id == task.dataset.id);
    elem.status = chosen;

    setLocalStorage();
    renderTasks();
  } else {
    status.classList.remove("in-progress");
    status.classList.add("completed");
    status.classList.remove("not-started");
    options.classList.add("hidden");
    statusEL.classList.add("hidden");

    const elem = tasks.find((t) => t.id == task.dataset.id);
    elem.status = chosen;

    setLocalStorage();
    renderTasks();
  }
};

const edit = (btn) => {
  
  const task = btn.closest(".task");
  const options = task.querySelector(".options");
  options.classList.add("hidden");
  index = task.dataset.id;

  formBG.style.display = "flex";
  title.value = task.querySelector("h3").textContent;
  categories.value = task.dataset.category;
};

const deleteTask = (btn) => {
  const id = btn.closest(".task").dataset.id;
  const task = btn.closest(".task");

  const confirmed = confirm(`Delete ${task.querySelector("h3").textContent} ?`);

  if (confirmed) {
    const filtered = tasks.filter((t) => t.id != id);
    tasks = filtered;

    tasksContainer.removeChild(task);

    setLocalStorage();

    if(tasks.length == 0){
      tasksContainer.innerHTML = `<div class="empty-container">No Tasks Available</div>`
      return 
    }
  }
};

function setLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
