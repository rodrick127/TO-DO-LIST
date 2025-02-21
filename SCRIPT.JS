document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const allBtn = document.getElementById('allBtn');
const activeBtn = document.getElementById('activeBtn');
const completedBtn = document.getElementById('completedBtn');

addTaskBtn.addEventListener('click', addTask);
allBtn.addEventListener('click', () => filterTasks('all'));
activeBtn.addEventListener('click', () => filterTasks('active'));
completedBtn.addEventListener('click', () => filterTasks('completed'));

// Add task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        // Save task to localStorage
        const tasks = getTasksFromStorage();
        tasks.push(task);
        saveTasksToStorage(tasks);

        renderTasks();
        taskInput.value = ""; // Clear input field after adding task
    }
}

// Render tasks from localStorage
function renderTasks() {
    const tasks = getTasksFromStorage();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : '');

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="remove" onclick="deleteTask(${task.id})">X</button>
        `;
        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleComplete(taskId) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(tasks);
        renderTasks();
    }
}

// Delete task
function deleteTask(taskId) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToStorage(tasks);
    renderTasks();
}

// Get tasks from localStorage
function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks based on their state
function filterTasks(filter) {
    const tasks = getTasksFromStorage();
    let filteredTasks = [];
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks;
    }

    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : '');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="remove" onclick="deleteTask(${task.id})">X</button>
        `;
        taskList.appendChild(li);
    });
}

// Load tasks on page load
function loadTasks() {
    renderTasks();
}
