import TodoForm from "./todoform";

export default class Todo {
  constructor({ id, text, completed }, onComplete, onDelete, onEdit) {
    this.id = id;
    this.completed = completed;
    this.editing = false;
    this.view = this.createView(text, onComplete, onDelete, onEdit);
  }

  createView(text, onComplete, onDelete, onEdit) {
    const el = document.createElement("li");

    if (!this.completed) {
      const checkbox = this.getCheckbox(onComplete);

      el.ondblclick = () => {
        if (this.editing) {
          return;
        }

        this.editing = true;
        this.view.innerHTML = "";
        this.view.appendChild(this.getEditForm(text, onEdit));
      };
      el.appendChild(checkbox);
    } else {
      el.className = "completed";
    }

    const button = this.getDeleteButton(onDelete);

    el.appendChild(document.createTextNode(text));
    el.appendChild(button);

    return el;
  }

  getCheckbox(onComplete) {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.onchange = () => {
      onComplete(this.id);
    };

    return checkbox;
  }

  getDeleteButton(onDelete) {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.innerText = "Remove";

    button.onclick = () => {
      onDelete(this.id);
    };

    return button;
  }

  getEditForm(value, onEdit) {
    return new TodoForm({
      value,
      onSubmit: text => {
        onEdit(this.id, text);
      }
    }).view;
  }
}
