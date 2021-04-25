let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__content');
let closePopupPopup = document.querySelector('.popup-edit__close');
let openPopupButton = document.querySelector('user-info__button');
let nameInput = document.querySelector('name');
let jobInput = document.querySelector('about');
let title = document.querySelector('user-info__name');
let subtitle = document.querySelector('.user-info__job');

function formSubmitHandler (event) {
    event.preventDefault();
    let job = jobInput.value;
    let name = nameInput.value;
    title.textContent = name;
    subtitle.textContent = job;
    popup.classList.remove('popup-edit_is-opened');
}

function formCloseHandler () {
    popup.classList.remove('popup-edit_is-opened');
}

function formOpenHandler () {
    let name = title.textContent;
    let job = subtitle.textContent;
    nameInput.value = name;
    jobInput.value = job;
    popup.classList.add('popup-edit_is-opened');
}
formElement.addEventListener('submit', formSubmitHandler);
closePopupPopup.addEventListener('click', formCloseHandler);
openPopupButton.addEventListener ('click', formOpenHandler);