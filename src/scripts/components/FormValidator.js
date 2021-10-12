class FormValidator {
    constructor(formSelector, selectors) {
        this._form = document.querySelector(formSelector);
        this._selectors = selectors;

        this._inputs = this._form.querySelectorAll(this._selectors.inputSelector);
        this._buttonSubmit = this._form.querySelector(this._selectors.submitButtonSelector);
    }

    get form() {
        return this._form;
    }

    _setEventListeners() {
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._setInputListener(input);
                this.checkIsPossibleSubmit();
            });
        });
    }

    _setInputListener(inputElement) {
        const errorContainer = this._form.querySelector(`#${inputElement.name}-error`);
        const validity = inputElement.validity;

        let error = '';

        if (!inputElement.value.length) {
            error = 'Вы пропустили это поле';
        } else if (validity.tooShort || validity.tooLong) {
            const currentLength = inputElement.value.length;
            const min = inputElement.getAttribute('minlength');
            const max = inputElement.getAttribute('maxlength');

            error = `Неправильно заполнено поле! Введено ${currentLength}, должно быть от ${min} до ${max}`;
        } else if (validity.typeMismatch) {
            error = 'Это не ссылка';
        }

        if (error) {
            inputElement.classList.add(this._selectors.inputErrorClass);
            errorContainer.classList.add(this._selectors.errorClass);
        } else {
            inputElement.classList.remove(this._selectors.inputErrorClass);
            errorContainer.classList.remove(this._selectors.errorClass);
        }

        errorContainer.textContent = error;
    };

    checkIsPossibleSubmit() {
        const isValid = this._form.checkValidity();

        if (isValid) {
            this._buttonSubmit.classList.remove(this._selectors.inactiveButtonClass);
            this._buttonSubmit.removeAttribute('disabled');
        } else {
            this._buttonSubmit.classList.add(this._selectors.inactiveButtonClass);
            this._buttonSubmit.setAttribute('disabled', 'disabled');
        }
    }

    enableValidation() {
        this.checkIsPossibleSubmit();
        this._setEventListeners();
    }
}

export { FormValidator };
