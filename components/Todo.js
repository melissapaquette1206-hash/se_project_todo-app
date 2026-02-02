class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._id = data.id;

    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;

    this._templateElement = document.querySelector(this._selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._completed);
    });
  }

  _toggleCompletion() {
    this._completed = this._todoCheckboxEl.checked;
  }

  _setCheckbox() {
    this._todoCheckboxEl.checked = this._completed;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);

    this._setCheckbox();
  }

  _setDate() {
    if (!this._date) {
      this._todoDateEl.textContent = "";
      return;
    }

    const due = new Date(this._date);
    if (Number.isNaN(due.getTime())) {
      this._todoDateEl.textContent = "";
      return;
    }

    this._todoDateEl.textContent = `Due: ${due.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDateEl = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._name;

    this._setDate();
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
