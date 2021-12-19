// Selecet elements

const form = document.querySelector("#todo-form");
const formInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearTodos = document.querySelector("#clear-todos");

const name = prompt("What is your name?");
document.querySelector("#header").textContent = name;

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearTodos.addEventListener("click", clearAllTodos);
}



function addTodo(e) {
    const newTodo = formInput.value.trim();

    if (newTodo === "") {
        showAlert("danger", "Please enter a task!");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Added Successfully");
        formInput.value = "";
    }

    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const todoItem = document.createElement("li");
    const deleteItem = document.createElement("a");

    deleteItem.href = "#";
    deleteItem.className = "delete-item";
    deleteItem.innerHTML = "<i class = 'fa fa-remove'></i>";

    todoItem.className = "list-group-item d-flex justify-content-between";
    
    todoItem.appendChild(document.createTextNode(newTodo));
    todoItem.appendChild(deleteItem);

    todoList.appendChild(todoItem);
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1500);
}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        
    }

    return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function(nt) {
        addTodoToUI(nt);
    })
}

function deleteTodo(e) {
    if (e.target.className == "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("secondary", "Successfully deleted!");
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            item.setAttribute("style", "display : none !important");
        }
        else {
            item.setAttribute("style", "display : block");
        }
    })
}

function clearAllTodos(e) {
    while (todoList.firstElementChild != null) {
        todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
}

