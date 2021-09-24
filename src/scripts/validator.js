const enableValidation = selectors => {
    const forms = document.querySelectorAll(selectors.formSelector);

    forms.forEach(form => {
        setEventListeners(form, selectors);
    });
}

const setEventListeners = (formElement, selectors) => {
    const inputs = formElement.querySelectorAll(selectors.inputSelector);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            setInputListener(formElement, input, selectors);
            setSubmitButtonListener(formElement, selectors);
        });
    });
};

const setInputListener = (formElement, inputElement, selectors) => {
    const errorContainer = formElement.querySelector(`#${inputElement.name}-error`);
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
        inputElement.classList.add(selectors.inputErrorClass);
        errorContainer.classList.add(selectors.errorClass);
    } else {
        inputElement.classList.remove(selectors.inputErrorClass);
        errorContainer.classList.remove(selectors.errorClass);
    }

    errorContainer.textContent = error;
};

const setSubmitButtonListener = (formElement, selectors) => {
    const button = formElement.querySelector(selectors.submitButtonSelector)
    const isValid = formElement.checkValidity();

    if (isValid) {
        button.classList.remove(selectors.inactiveButtonClass);
        button.removeAttribute('disabled');
    } else {
        button.classList.add(selectors.inactiveButtonClass);
        button.setAttribute('disabled', 'disabled');
    }
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_error',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
});
