export default class TodoForm {
  constructor({ value = "", onSubmit }) {
    this.view = this.createView(value, onSubmit);
  }

  createView(value, onSubmit) {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.setAttribute("type", "search");
    input.setAttribute("value", value);
    form.appendChild(input);
    form.onsubmit = e => {
      e.preventDefault();

      onSubmit(input.value);
    };

    return form;
  }
}
