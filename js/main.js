const todos = [
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: false },
    { id: 3, text: 'Todo 3', completed: false }
]
const todoList = document.querySelector('.todo-list');

renderTodos(todos, todoList);

function renderTodos(data, parentEl) {

    parentEl.innerHTML = '';

    data.forEach(function (el) {

        const todo = document.createElement('li');
        const index = document.createElement('span');
        const inp = document.createElement('input');
        const text = document.createElement('p');
        const btn = document.createElement('button');

        todo.className = 'todo-item';
        todo.dataset.id = el.id;

        index.className = 'todo-item__number mr-1';
        index.innerHTML = el.id;

        inp.className = 'todo-item__completed mr-1';
        inp.type = 'checkbox';
        inp.checked = el.completed;

        text.className = `todo-item__text mr-1 ${el.completed ? 'todo-item__text_completed' : ''}`;
        text.innerHTML = el.text;

        btn.className = 'todo-item__delBtn';
        btn.innerHTML = 'DEL';

        parentEl.append(todo);
        todo.append(index, inp, text, btn)
    });
    const todoItemCompleted = document.querySelectorAll('.todo-item__completed');

    todoItemCompleted.forEach(function (el) {
        el.onchange = function () {
            const id = this.parentElement.dataset.id;
            const todo = data.find(function (item) {
                return item.id == id;
            });
            todo.completed = !todo.completed;
            renderTodos(data, parentEl);
        }
    });
    const btnsDel = document.querySelectorAll('.todo-item__delBtn');

    btnsDel.forEach(function (el) {
        el.onclick = function () {
            const id = this.parentElement.dataset.id;
            const todoIndex = data.findIndex(function (item) {
                return item.id == id;
            });
            if (todoIndex !== -1) {
                data.splice(todoIndex, 1); // Удаляем элемент из массива

                // Пересчитываем индексы для оставшихся элементов
                data.forEach(function (item, index) {
                    item.id = index + 1;
                });
                renderTodos(data, parentEl); // Перерендериваем список
            }
        }
    });

    const btnAdd = document.querySelector('.add-btn');
    const inpAdd = document.querySelector('.add-input');

    btnAdd.onclick = function () {

        const newTodo = {
            id: data.length + 1,
            text: inpAdd.value.trim(),
            completed: false,
        }
        data.push(newTodo);

        renderTodos(data, parentEl)
    };

    const chkOnlyCompleted = document.querySelector('.chk-only-completed');

    chkOnlyCompleted.onchange = function () {
        let filteredData;

        if (chkOnlyCompleted.checked) {
            filteredData = todos.filter(function (el) {
                return el.completed === true;
            });
            filteredData.forEach(function (item, index) {
                item.id = index + 1;
            });
        } else {
            filteredData = todos;
        }

        renderTodos(filteredData, parentEl);
    }
};