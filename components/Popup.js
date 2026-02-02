class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupCloseButton || evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export default Popup;
