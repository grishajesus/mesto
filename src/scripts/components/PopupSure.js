import { Popup } from "./Popup";

class PopupSure extends Popup {
    constructor(selector) {
        super(selector);

        this._form = this._popup.querySelector("form");
        this._submitButton = this._form.querySelector("button[type=submit]");

        this._onSubmitForm = null;
    }

    enableLoading() {
        const originText = this._submitButton.textContent;

        this._submitButton.setAttribute("data-origin-text", originText);
        this._submitButton.textContent = "Загрузка...";
    }

    disableLoading() {
        const originText = this._submitButton.getAttribute("data-origin-text");

        this._submitButton.removeAttribute("origin-text");
        this._submitButton.textContent = originText;
    }

    handleSubmit(event) {
        event.preventDefault();

        this._onSubmitForm();
    }

    setSubmitFunction(callback) {
        this._onSubmitForm = callback;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (event) =>
            this.handleSubmit(event)
        );
    }
}

export { PopupSure };
