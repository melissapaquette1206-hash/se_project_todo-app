import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

// ---- COUNTER ----
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// ---- HANDLERS ----
function handleCheck(isCompleted) {
  todoCounter.updateCompleted(isCompleted);
}

function handleDelete(isCompleted) {
  todoCounter.decrementTotal();

  if (isCompleted) {
    todoCounter.updateCompleted(false);
  }
}

// ---- SECTION ----
const section = new Section({
  items: initialTodos,
  renderer: (data) => {
    const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);

    todosList.append(todo.getView());
  },
  containerSelector: ".todos__list",
});

section.renderItems();

// ---- ADD TODO POPUP ----
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date: dateInput } = inputValues;

    let processedDate = null;
    if (dateInput) {
      processedDate = new Date(dateInput);
      processedDate.setMinutes(
        processedDate.getMinutes() + processedDate.getTimezoneOffset(),
      );
    }

    const newTodo = {
      name,
      date: processedDate,
      completed: false,
      id: uuidv4(),
    };

    // render via Section pattern
    const todo = new Todo(newTodo, "#todo-template", handleCheck, handleDelete);

    todosList.append(todo.getView());
    todoCounter.incrementTotal();

    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

// ---- EVENTS ----
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// ---- VALIDATION ----
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
