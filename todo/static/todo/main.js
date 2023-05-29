const newTodoInput = document.querySelector("#new-todo");
const addTodoButton = document.querySelector("#add-todo");
const todoList = document.querySelector("#todo-list");
const completedList = document.querySelector("#completed-list");

function getTodos() {
  axios
    .get("/api/todos/")
    .then((response) => {
      todoList.innerHTML = "";
      completedList.innerHTML = "";
      const todos = response.data;
      for (let todo of todos) {
        if (todo.completed) {
          completedList.innerHTML += `<li class="todoWrapper"><span class="todo completed">${todo.title}</span> 
          <div class="ctrlWrapper">
          <button onclick="deleteTodo(${todo.id})">❌</button>
          </div>
          </li>`;
        } else {
          todoList.innerHTML += `
          <li class="todoWrapper">
            <span class="todo">${todo.title} </span>
            <div class="ctrlWrapper">
                <button onclick="deleteTodo(${todo.id})">❌</button><button onclick="completeTodo(${todo.id})">✅</button>
            </div>
          </li>
          `;
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function addTodo() {
  const title = newTodoInput.value;
  if (title) {
    axios
      .post("/api/todos/", { title, completed: false })
      .then((response) => {
        getTodos();
        newTodoInput.value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function completeTodo(id) {
  axios
    .put(`/api/todos/${id}/`, { completed: true })
    .then((response) => {
      getTodos();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteTodo(id) {
  axios
    .delete(`/api/todos/${id}/`)
    .then((response) => {
      getTodos();
    })
    .catch((error) => {
      console.error(error);
    });
}

addTodoButton.addEventListener("click", addTodo);

getTodos();
