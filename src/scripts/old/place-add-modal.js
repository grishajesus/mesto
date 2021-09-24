import { openPopup, closePopup } from "./popup.js";
import { Card } from './Card.js';
import { FormValidator, defaultFormValidatorSelectors } from "./FormValidator.js";

const placeAddCardForm = document.querySelector('form[name="place-add-card__form"]');
const placeAddCardFormValidator = new FormValidator(placeAddCardForm, defaultFormValidatorSelectors);

const placeCardAddPopup = document.querySelector('.popup_type_card-add');
const placeCardAddCloseButton = placeCardAddPopup.querySelector('.popup__close-button');

const placeAddCardButton = document.querySelector('.profile__add-button');

const handleSubmitPlaceAddCardForm = (event) => {
	// event.preventDefault();

    // const formData = {
    //     name: '',
    //     link: '',
    // };

    // const inputs = event.target.querySelectorAll('input');

    // inputs.forEach(input => {
    //     formData[input.name] = input.value;
    // });

    // const card = new Card(formData, '#place-card-template');
    // const cardNode = card.createDOMNode();

	// // placesSection.addItem(cardNode);
	// event.target.reset();

	// closePopup(placeCardAddPopup);
};

placeAddCardButton.addEventListener('click', () => {
    placeAddCardFormValidator.enableValidation();

    openPopup(placeCardAddPopup);
});

placeCardAddCloseButton.addEventListener('click', () => closePopup(placeCardAddPopup));

placeAddCardForm.addEventListener("submit", handleSubmitPlaceAddCardForm);
