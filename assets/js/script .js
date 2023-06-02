const addTask = document.querySelector("#plus");
const tasksContainer = document.querySelector("#tasks-container");
const removeAllTasksButton = document.querySelector("#clear");
const taskText = document.querySelector("#taskText");
const taskDataKey = "taskSalvas";
let tasks = [];

function salvarTasks() {
    const textTask = taskText.value;

    if (textTask.trim() !== "") {
        const task = {
            text: textTask,
            marked: false,
        };

        tasks.push(task);
        updateLocalStorage();
        renderTasks();

        taskText.value = ""; // Limpa o campo de entrada após salvar a tarefa
    }
}

function updateLocalStorage() {
    localStorage.setItem(taskDataKey, JSON.stringify(tasks));
}

function renderTasks() {
    const fragment = document.createDocumentFragment();

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("tasks");

        const squareIcon = document.createElement("i");
        squareIcon.classList.add("icons", "square", "fa-regular", "fa-square");

        const taskValue = document.createElement("div");
        taskValue.classList.add("task");
        taskValue.textContent = task.text;

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("icons", "trash", "ri-delete-bin-line");

        taskDiv.appendChild(squareIcon);
        taskDiv.appendChild(taskValue);
        taskDiv.appendChild(trashIcon);

        fragment.appendChild(taskDiv);

        squareIcon.addEventListener("click", () => {
            toggleTaskMarked(index);
        });

        trashIcon.addEventListener("click", () => {
            removeTask(index);
        });

        if (task.marked) {
            squareIcon.classList.remove("fa-square");
            squareIcon.classList.add("fa-square-check");
            taskValue.classList.add("marked");
        }
    });

    tasksContainer.innerHTML = "";
    tasksContainer.appendChild(fragment);
}

function toggleTaskMarked(index) {
    tasks[index].marked = !tasks[index].marked;
    updateLocalStorage();
    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

function removerTodasAsTasks() {
    tasks = []; // redefine o array de tarefas para vazio
    updateLocalStorage();
    renderTasks();
}

addTask.addEventListener("click", salvarTasks);
removeAllTasksButton.addEventListener("click", removerTodasAsTasks);

taskText.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que o formulário seja enviado

        salvarTasks();
    }
});

// Restaurar o estado dos elementos ao entrar na página
document.addEventListener("DOMContentLoaded", function () {
    const taskJson = localStorage.getItem(taskDataKey);
    if (taskJson) {
        tasks = JSON.parse(taskJson);
        renderTasks();
    }
});
