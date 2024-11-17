console.log('JS is sourced!');

getTodos();

//Get the todos from the database:
function getTodos() {
    axios.get('/todos')
        .then((response) => {
            const todos = response.data;
            const todoList = document.getElementById('todos');
            todoList.innerHTML = ''; //Clear the current list???

            todos.forEach((todo) => {
                const todoItem = document.createElement('li');
                todoItem.setAttribute('data-testid', 'toDoItem');
                todoItem.className = todo.isComplete ? 'completed' : '';
                todoItem.innerHTML = `
                    ${todo.task}
                    <button data-testid="completeButton" onclick="markComplete(${todo.id})">Complete</button>
                    <button data-testid="deleteButton" onclick="deleteTodo(${todo.id})">Delete</button>
                `;
                todoList.appendChild(todoItem);
            });
        })
        .catch((err) => console.error('Error getting todos.', err));
}

//Add a new todo:
function addTodo() {
    const taskInput = document.querySelector('[data-testid="toDoTextInput"]');
    const task = taskInput.ariaValueMax.trim();

    axios.post('/todos', task)
        .then(() => {
            taskInput.value = '';
            getTodos();
        })
        .catch((err) => console.error('Error adding a new todo.', err));
};