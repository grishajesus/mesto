let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__content');
let closePopupPopup = document.querySelector('.popup__close-button')
let openPopupButton = document.querySelector('.profile__edit-button');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#about');
let title = document.querySelector('.profile__name');
let subtitle = document.querySelector('.profile__job');

function formSubmitHandler (event) {
    event.preventDefault();
    let job = jobInput.value;
    let name = nameInput.value;
    title.textContent = name;
    subtitle.textContent = job;
    popup.classList.remove('popup_opened');

}

function formCloseHandler () {
    popup.classList.remove('popup_opened');
}

function formOpenHandler () {
    let name = title.textContent;
    let job = subtitle.textContent;
    nameInput.value = name;
    jobInput.value = job;
    popup.classList.add('popup_opened');
}
    

formElement.addEventListener('submit', formSubmitHandler);
closePopupPopup.addEventListener('click', formCloseHandler);
openPopupButton.addEventListener ('click', formOpenHandler);