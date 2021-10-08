class FormValidator {
    constructor(formSelector, selectors) {
        this.form = document.querySelector(formSelector);
        this.selectors = selectors;

        this._buttonSubmit = this.form.querySelector(this.selectors.submitButtonSelector);
    }

    _setEventListeners() {
        const inputs = this.form.querySelectorAll(this.selectors.inputSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._setInputListener(input);
                this.checkIsPossibleSubmit();
            });
        });
    }

    _setInputListener(inputElement) {
        const errorContainer = this.form.querySelector(`#${inputElement.name}-error`);
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
            inputElement.classList.add(this.selectors.inputErrorClass);
            errorContainer.classList.add(this.selectors.errorClass);
        } else {
            inputElement.classList.remove(this.selectors.inputErrorClass);
            errorContainer.classList.remove(this.selectors.errorClass);
        }

        errorContainer.textContent = error;
    };

    checkIsPossibleSubmit() {
        const isValid = this.form.checkValidity();

        if (isValid) {
            this._buttonSubmit.classList.remove(this.selectors.inactiveButtonClass);
            this._buttonSubmit.removeAttribute('disabled');
        } else {
            this._buttonSubmit.classList.add(this.selectors.inactiveButtonClass);
            this._buttonSubmit.setAttribute('disabled', 'disabled');
        }
    }

    enableValidation() {
        this.checkIsPossibleSubmit();
        this._setEventListeners();
    }
}

export { FormValidator };
