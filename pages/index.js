import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/popupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    let date = null;
    if (dateInput) {
      date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const id = uuidv4();
    const values = { name, date, id };

    renderTodo(values);

    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (data) => {
    const todosList = document.querySelector(".todos__list");
    const todo = new Todo(data, "#todo-template", todoCounter);
    todosList.append(todo.getView());
  },
  containerSelector: ".todos__list",
});
todoList.renderItems();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  todosList.append(todoElement);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

initialTodos.forEach((item) => {
  renderTodo(item);
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   let date = null;
//   if (dateInput) {
//     date = new Date(dateInput);
//     date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
//   }

//   const id = uuidv4();
//   const values = { name, date, id };

//   renderTodo(values);

//   newTodoValidator.resetValidation();
//   addTodoPopup.close();
// });

//addTodoCloseButton.addEventListener("click", () => {
//addTodoPopup.close();});

//const openModal = (modal) => {
// modal.classList.add("popup_visible");
//};

//const closeModal = (modal) => {
// modal.classList.remove("popup_visible");
//};
