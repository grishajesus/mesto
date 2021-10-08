import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(selector, onSubmitForm) {
        super(selector);

        this.onSubmitForm = onSubmitForm;
    }

    close() {
        super.close();
        this.popup.querySelector('form').reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this.popup.querySelector('form')
            .addEventListener('submit', this.onSubmitForm.bind(this));
    }

    _getInputValues(event) {
        const formData = Object.fromEntries(new FormData(event.target));

        return formData;
    }
}

export { PopupWithForm };
