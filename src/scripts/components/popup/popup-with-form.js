import { Popup } from "./popup";

class PopupWithForm extends Popup {
    constructor(selector, onSubmitForm) {
        super(selector);

        this.form = this.popup.querySelector("form");
        this.submitButton = this.form.querySelector("button[type=submit]");
        this.validator = null;
        this.onSubmitted = null;
        this.onSubmitForm = onSubmitForm;
    }

    close() {
        super.close();
        this.popup.querySelector("form").reset();

        if (this.validator) {
            this.validator.disableValidation();
        }
    }

    enableLoading() {
        const originText = this.submitButton.textContent;

        this.submitButton.setAttribute("data-origin-text", originText);
        this.submitButton.textContent = "Сохранение...";
    }

    disableLoading() {
        const originText = this.submitButton.getAttribute("data-origin-text");

        this.submitButton.removeAttribute("origin-text");
        this.submitButton.textContent = originText;
    }

    setOnSubmitted(onSubmitted) {
        this.onSubmitted = onSubmitted;
    }

    setValidator(validator) {
        this.validator = validator;
        this.validator.enableValidation();
    }

    setInputValues(payload) {
        const entries = Object.entries(payload);

        entries.forEach(([key, value]) => {
            const input = this._getInput(`input[name=${key}]`);

            if (input) {
                input.value = value;
            }
        });
    }

    setEventListeners() {
        super.setEventListeners();

        this.form.addEventListener("submit", this.onSubmitForm.bind(this));
    }

    _getInput(selector) {
        return this.form.querySelector(selector);
    }

    _getInputValues(event) {
        const formData = Object.fromEntries(new FormData(event.target));

        return formData;
    }
}

export { PopupWithForm };
