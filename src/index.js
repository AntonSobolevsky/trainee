import TodoForm from "./todoform";
import TodoList from "./todolist";

import { DOM } from "./dom";

let todos = [];

const onComplete = id => {
  const todo = todos.find(todo => todo.id === id);
  todo.completed = true;

  todos = [
    ...todos.filter(el => !el.completed),
    ...todos.filter(el => el.completed)
  ];
};

const onDelete = id => {
  todos = todos.filter(el => el.id !== id);
};

const onSubmit = todo => {
  todos = [
    { id: new Date().valueOf(), completed: false, text: todo },
    ...todos
  ];
};

const onEdit = (id, text) => {
  const todo = todos.find(todo => todo.id === id);
  todo.text = text;
};

const app = new DOM([
  { el: TodoForm, props: () => {}, actions: { onSubmit } },
  {
    el: TodoList,
    props: () => {
      return { todos };
    },
    actions: { onComplete, onDelete, onEdit }
  }
]);

window.addEventListener("load", () => {
  app.render();
});
