const todos = [
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: false },
    { id: 3, text: 'Todo 3', completed: false }
]

const todoListEl = document.querySelector('.todo-list');
let newData;

renderTodoList(todos, todoListEl);

function renderTodoList(data, parentEl) {

    let todoChksEls;

    let todoItems = data.map(function (item, index) {

        const todoItem = `
            <li class="todo-item" data-id="${item.id}">
                <span class="todo-item__number mr-1">${index + 1}</span>
                <input 
                    class="todo-item__completed mr-1" 
                    type="checkbox" ${item.completed ? 'checked' : ''}>
                <p class="todo-item__text mr-1 ${item.completed ? 'todo-item__text_completed' : ''}">${item.text}</p>
                <button class="todo-item__delBtn">del</button>
            </li>       
`;
        return todoItem
    }).join('');

    parentEl.innerHTML = todoItems;

    todoChksEls = document.querySelectorAll('.todo-item__completed');

    todoChksEls.forEach(function (el) {
        el.onchange = function () {

            const id = this.parentElement.dataset.id;
            const todo = data.find(function (el) {
                return el.id == id;
            });
            if (!todo) {
                return;
            }

            todo.completed = !todo.completed;

            if (typeof newData === 'undefined') {
                renderTodoList(data, todoListEl);
            } else renderTodoList(newData, todoListEl);
        }
    })

    const btnsDel = document.querySelectorAll('.todo-item__delBtn');

    btnsDel.forEach(function (el) {
        el.onclick = function () {

            const id = this.parentElement.dataset.id;
            const todo = data.find(function (el) {
                return el.id == id;
            });
            newData = data.filter(function (item) {
                return item !== todo;
            })
            renderTodoList(newData, todoListEl);
        }
    })
}

const btnAdd = document.querySelector('.add-btn');
const addInput = document.querySelector('.add-input');

btnAdd.onclick = function () {

    const newText = addInput.value.trim();

    if (newText === '') {
        alert('Введите текст для нового дела');
        return;
    }

    const newId = todos.length + 1;

    const newTodo = {
        id: newId,
        text: newText,
        completed: false
    };

    todos.push(newTodo);

    addInput.value = '';

    if (typeof newData !== 'undefined') {
        newData.push(newTodo);
    };

    let filteredTodos;

    if (typeof newData === 'undefined') {

        if (checkOnlyCompleted.checked) {
            filteredTodos = todos.filter(el => el.completed);
        } else {
            filteredTodos = todos;
        }
        renderTodoList(filteredTodos, todoListEl);
    }
    else {
        const filteredNewData = checkOnlyCompleted.checked
            ? newData.filter(el => el.completed)
            : newData;
        renderTodoList(filteredNewData, todoListEl);
    }
}

const checkOnlyCompleted = document.querySelector('.chk-only-completed');

checkOnlyCompleted.onchange = function () {

    let checkedTodos;

    if (checkOnlyCompleted.checked === true) {
        if (typeof newData === 'undefined') {
            checkedTodos = todos.filter(function (el) {
                return el.completed === true;
            })
            renderTodoList(checkedTodos, todoListEl);
        } else {
            checkedTodos = newData.filter(function (el) {
                return el.completed === true;
            })
            renderTodoList(checkedTodos, todoListEl);
        }
    } else {
        if (typeof newData === 'undefined') {
            renderTodoList(todos, todoListEl)
        } else renderTodoList(newData, todoListEl);
    }

}
