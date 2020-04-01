const APP_ID = "app";

export class DOM {
  constructor(app) {
    this.app = app;
  }

  createDOM(elements) {
    const dom = elements.map(node => {
      const actions = {};

      Object.entries(node.actions).forEach(([name, action]) => {
        actions[name] = this.createAction(action);
      });

      const props = {
        ...node.props(),
        ...actions
      };
      return new node.el(props);
    });

    const fragment = document.createDocumentFragment();
    dom.forEach(el => fragment.appendChild(el.view));

    return fragment;
  }

  render() {
    const target = document.getElementById(APP_ID);
    target.innerHTML = "";

    target.appendChild(this.createDOM(this.app));
  }

  createAction(action) {
    return (...args) => {
      action(...args);
      this.render();
    };
  }
}
