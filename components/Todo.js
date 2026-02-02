class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    // this._data = data;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = data.selector;
    this.handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    // this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
      // this._data.completed = !this._data.completed;
    });

    this._handleDelete.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDateEl = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    if (this._data.date) {
      const due = new Date(this._data.date);

      if (!Number.isNaN(due.getTime())) {
        todoDateEl.textContent = `Due: ${due.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      } else {
        todoDateEl.textContent = "";
      }

      this._generateCheckboxEl();
      this._setEventListeners();

      return this._todoElement;
    }
  }
}
export default Todo;
