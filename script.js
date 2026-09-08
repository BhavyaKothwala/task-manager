// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save tasks to localStorage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Add a new task
function addTask() {

    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");

    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;

    // Check if task is empty
    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create a new task
    const newTask = {

        id: Date.now(),

        title: taskText,

        priority: priority

    };


    // Add task to the array
    tasks.push(newTask);


    // Save task
    saveTasks();


    // Clear input box
    taskInput.value = "";


    // Display tasks
    displayTasks();

}


// Display all tasks
function displayTasks() {

    const taskList = document.getElementById("taskList");

    // Clear old task list
    taskList.innerHTML = "";


    // If there are no tasks
    if (tasks.length === 0) {

        taskList.innerHTML = `
            <p class="empty-message">
                No tasks available. Add your first task!
            </p>
        `;

        return;
    }


    // Display each task
    tasks.forEach(function(task) {

        const taskCard = document.createElement("div");

        taskCard.className = "task-card";


        taskCard.innerHTML = `

            <div class="task-info">

                <h3>${task.title}</h3>

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

            </div>


            <div class="actions">

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})">

                    Edit

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    Delete

                </button>

            </div>

        `;


        taskList.appendChild(taskCard);

    });

}


// Edit a task
function editTask(id) {

    const task = tasks.find(function(task) {

        return task.id === id;

    });


    // Ask user for new task name
    const newTitle = prompt(
        "Edit task:",
        task.title
    );


    // User clicked Cancel
    if (newTitle === null) {

        return;

    }


    // Check empty task
    if (newTitle.trim() === "") {

        alert("Task cannot be empty.");

        return;

    }


    // Update task
    task.title = newTitle.trim();


    // Save updated task
    saveTasks();


    // Display updated tasks
    displayTasks();

}


// Delete a task
function deleteTask(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this task?"
    );


    // User clicked Cancel
    if (!confirmed) {

        return;

    }


    // Remove task
    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    // Save updated list
    saveTasks();


    // Display remaining tasks
    displayTasks();

}


// Display tasks when page opens
displayTasks();