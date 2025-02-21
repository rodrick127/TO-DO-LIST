document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = document.createElement('li');
        li.innerHTML = `${taskText} <button class="remove">X</button>`;
        
        // Add event listener to remove button
        li.querySelector('.remove').addEventListener('click', function() {
            li.remove();
        });

        document.getElementById('taskList').appendChild(li);
        taskInput.value = ""; // Clear input field after adding
    }
});

