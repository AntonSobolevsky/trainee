import Todo from "./todo";

export default class TodoList {
  constructor({ todos, onComplete, onDelete, onEdit }) {
    this.view = this.createView(todos, onComplete, onDelete, onEdit);
  }

  createView(todos, onComplete, onDelete, onEdit) {
    const ul = document.createElement("ul");

    todos.forEach(todo => {
      ul.appendChild(new Todo(todo, onComplete, onDelete, onEdit).view);
    });

    return ul;
  }
}
