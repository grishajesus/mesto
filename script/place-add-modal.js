import { profileCardAddPopup, closePopup } from "./common.js";
import { handleCreateCard } from "./places.js";

const placeAddCardForm = document.querySelector(
	'form[name="place-add-card__form"]'
);

const handleSubmitPlaceAddCardForm = (event) => {
	event.preventDefault();

    const formData = {
        name: '',
        link: '',
    };

    const inputs = event.target.querySelectorAll('input');

    inputs.forEach(input => {
        formData[input.name] = input.value;
    });

	handleCreateCard(formData);
	event.target.reset();

	closePopup(profileCardAddPopup);
};

placeAddCardForm.addEventListener("submit", handleSubmitPlaceAddCardForm);
