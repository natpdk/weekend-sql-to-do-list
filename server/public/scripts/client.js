console.log('JS is sourced!');

getTodos();

function getTodos() {
    axios.get('/todos')
        .then((response) => {
            const todos = response.data;
            const todoList = document.getElementById('todos');
            todoList.innerHTML = ''; //Clear the current list???
        })
}