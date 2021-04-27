let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let closePopup = document.querySelector('.popup__close-button')
let openPopupButton = document.querySelector('.profile__edit-button');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="about"]');
let title = document.querySelector('.profile__name');
let subtitle = document.querySelector('.profile__job');

function formSubmitHandler (event) {
    event.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent =  jobInput.value;
    popup.classList.remove('popup_opened');
}

function formCloseHandler () {
    popup.classList.remove('popup_opened');
}

function formOpenHandler () {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    popup.classList.add('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
closePopup.addEventListener('click', formCloseHandler);
openPopupButton.addEventListener ('click', formOpenHandler);