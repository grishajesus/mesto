import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(selector, onSubmitForm) {
        super(selector);

        this._popupForm = this._popup.querySelector('form');
        this._onSubmitForm = onSubmitForm;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm
            .addEventListener('submit', this._onSubmitForm.bind(this));
    }

    getInputValues(event) {
        this._formValues = {};
        Array.from(event.target).forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }
}

export { PopupWithForm };
