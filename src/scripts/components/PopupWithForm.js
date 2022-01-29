import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(selector, onSubmitForm) {
        super(selector);

        this._popupForm = this._popup.querySelector("form");
        this._inputs = this._popupForm.querySelectorAll("input");
        this._submitButton = this._popupForm.querySelector(
            "button[type=submit]"
        );

        this.onSubmitForm = onSubmitForm;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        const handleSubmitForm = this._onSubmitForm.bind(this);

        this._popupForm.addEventListener("submit", handleSubmitForm);
    }

    getInputValues() {
        this._formValues = {};

        this._inputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    enableLoading() {
        const originText = this._submitButton.textContent;

        this._submitButton.setAttribute("data-origin-text", originText);
        this._submitButton.textContent = "Сохранение...";
    }

    disableLoading() {
        const originText = this._submitButton.getAttribute("data-origin-text");

        this._submitButton.removeAttribute("origin-text");
        this._submitButton.textContent = originText;
    }

    _onSubmitForm(event) {
        event.preventDefault();

        this.onSubmitForm(this.getInputValues(event));
    }
}

export { PopupWithForm };
