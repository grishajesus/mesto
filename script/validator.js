function enableValidation() {
    const forms = document.querySelectorAll('.popup__form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            input.addEventListener('input', handleFormInput);
        });
    });
}

function setCustomError(form, input) {
    const errorWrap = form.querySelector(`#${input.name}-error`)
    const validity = input.validity;

    let error = '';

    if (!input.value.length) {
        error = 'Вы пропустили это поле';
    } else if (validity.tooShort || validity.tooLong) {
        const currentLength = input.value.length;
        const min = input.getAttribute('minlength');
        const max = input.getAttribute('maxlength');

        error = `Неправильно заполнено поле! Введено ${currentLength}, должно быть от ${min} до ${max}`;
    } else if (validity.typeMismatch) {
        error = 'Это не ссылка';
    }

    if (error) {
        errorWrap.classList.add('popup__input-error_visible');
    } else {
        errorWrap.classList.remove('popup__input-error_visible');
    }

    errorWrap.textContent = error;
}

function handleFormInput(event) {
    const input = event.target;
    const form = input.closest('form');

    setCustomError(form, input);
    setSubmitButtonState(form);
}

function setSubmitButtonState(form) {
    const button = form.querySelector('.popup__submit-button')
    const isValid = form.checkValidity();

    if (isValid) {
        button.classList.remove('popup__submit-button_error');
        button.removeAttribute('disabled');
    } else {
        button.classList.add('popup__submit-button_error');
        button.setAttribute('disabled', 'disabled');
    }
}

enableValidation();
