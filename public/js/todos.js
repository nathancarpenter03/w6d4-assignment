var dueDateInput = document.querySelector('#duedate');

getTodos();

// Make the Pikaday date picker UI control
new Pikaday({ field: dueDateInput })

// Put a default due date value
dueDateInput.value = moment().add(1, 'day').format('YYYY-MM-DD');

// Checkbox function

// Listen for all clicks in parent container of checkbox (Event Bubbling)
document.querySelector('.todosContainer').addEventListener('click', handleClickOnCheckbox);

function handleClickOnCheckbox(e) {
    if (e.target.type === 'checkbox') {
        // Get the data-id attribute that has the current todo item ID
        var todoId = e.target.getAttribute('data-id');

        // Check to see if the checkbox is checked (returns true if it is, false if it isn't)
        var isComplete = e.target.checked;

        // Call the toggleTodoComplete function and pass our ID and completion status to it
        toggleTodoComplete(todoId, isComplete);
    }
}

// Toggle to do completion status
function toggleTodoComplete(todoId, isComplete) {
    if (isComplete) {
        fetch('/api/v1/todos/' + todoId + '/complete')
        .then(getTodos)
        } else {
        fetch('/api/v1/todos/' + todoId + '/incomplete')
        .then(getTodos)
    }
}

// Get all to dos functions
function getTodos() {
    
    fetch('http://localhost:3000/api/v1/todos')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);

         document.querySelector('.list-group').innerHTML = '';
         response.forEach(function(todo) {
             showTodo(todo)
         })

    })
}

function showTodo(todo) {
    var categoryColor;

    switch(todo.category) {
        case 'Work':
            categoryColor = 'label-success';
            break;
        case 'Finances':
            categoryColor = 'label-primary';
            break;
        case 'School':
            categoryColor = 'label-info';
            break;
        case 'Social':
            categoryColor = 'label-danger';
            break;
        case 'Hobbies':
            categoryColor = 'label-default';
            break;
        default:
            categoryColor = 'label-default';
    }

    var todoItem = `<li class="list-group-item">
    <div class="row">
        <div class="col-md-7">
            <input type="checkbox" data-id="${todo.id}" value="" ${todo.completed === 'yes' ? 'checked' : ''}><span class ="todo-margin">${todo.todo}</span>
        </div>
        <div class="col-md-2">
            <span class="label ${categoryColor}">${todo.category}</span>
        </div>
        <div class="col-md-2">
            <span class="label label-warning">${moment(todo.due_date).format('MM/DD/YY')}</span>
        </div>
    </div>
    </li>`;

    document.querySelector('.list-group').innerHTML += todoItem;
}

// Add to dos event listeners
var dueDateInput = document.querySelector('#duedate');

document.querySelector('#new-todo-button').addEventListener('click', addTodo);

document.querySelector('#new-todo').addEventListener('keypress', handleKeyPressOnTodoItem);

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

// Add new to do 
function addTodo() {
    var newCategory = document.querySelector('#sel1').value.trim();
    var newDueDate = document.querySelector('#duedate').value.trim();
    var newTodo = document.querySelector('#new-todo').value.trim();

    if (newCategory !== '' && newDueDate !== '' && newTodo !== '') {
        document.querySelector('#sel1').value = '';
        document.querySelector('#duedate').value = '';
        document.querySelector('#new-todo').value = '';

        fetch('http://localhost:3000/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            todo: newTodo,
            category: newCategory,
            due_date: newDueDate
        })
    })

        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
        })
        .then (function() {
            newTodo === '';

        })
        .then(getTodos)

    } else {
        alert('Category, due date, and task are required.')
        todoCategoryInput.focus()
    }
}


