const defaultFormValidatorSelectors = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_error",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_visible",
};

class FormValidator {
    constructor(formSelector, selectors) {
        this.form = document.querySelector(formSelector);
        this.selectors = selectors;

        this.onSetListener = this._setListener.bind(this);
    }

    _setEventListeners() {
        const inputs = this.form.querySelectorAll(this.selectors.inputSelector);

        inputs.forEach((input) => {
            input.addEventListener("input", this.onSetListener);
        });
    }

    _resetEventListeners() {
        const inputs = this.form.querySelectorAll(this.selectors.inputSelector);

        inputs.forEach((input) => {
            input.removeEventListener("input", this.onSetListener);
        });
    }

    _setListener(input) {
        this._setInputListener(input.target);
        this._checkIsPossibleSubmit();
    }

    _setInputListener(inputElement) {
        const errorContainer = this.form.querySelector(
            `#${inputElement.name}-error`
        );
        const validity = inputElement.validity;

        let error = "";

        if (!inputElement.value.length) {
            error = "Вы пропустили это поле";
        } else if (validity.tooShort || validity.tooLong) {
            const currentLength = inputElement.value.length;
            const min = inputElement.getAttribute("minlength");
            const max = inputElement.getAttribute("maxlength");

            error = `Неправильно заполнено поле! Введено ${currentLength}, должно быть от ${min} до ${max}`;
        } else if (validity.typeMismatch) {
            error = "Это не ссылка";
        }

        if (error) {
            inputElement.classList.add(this.selectors.inputErrorClass);
            errorContainer.classList.add(this.selectors.errorClass);
        } else {
            inputElement.classList.remove(this.selectors.inputErrorClass);
            errorContainer.classList.remove(this.selectors.errorClass);
        }

        errorContainer.textContent = error;
    }

    _checkIsPossibleSubmit() {
        const button = this.form.querySelector(
            this.selectors.submitButtonSelector
        );
        const isValid = this.form.checkValidity();

        if (isValid) {
            button.classList.remove(this.selectors.inactiveButtonClass);
            button.removeAttribute("disabled");
        } else {
            button.classList.add(this.selectors.inactiveButtonClass);
            button.setAttribute("disabled", "disabled");
        }
    }

    _resetErrors() {
        const inputs = this.form.querySelectorAll(this.selectors.inputSelector);

        inputs.forEach((input) => {
            const error = this.form.querySelector(`#${input.name}-error`);

            error.textContent = "";
        });
    }

    enableValidation() {
        this._checkIsPossibleSubmit();
        this._setEventListeners();
    }

    disableValidation() {
        this._resetEventListeners();
        this._resetErrors();
    }
}

export { FormValidator, defaultFormValidatorSelectors };
