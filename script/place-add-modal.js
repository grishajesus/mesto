import { profileCardAddPopup, closePopup } from "./common.js";
import { handleCreateCard } from "./places.js";

const placeAddCardForm = document.querySelector(
	'form[name="place-add-card__form"]'
);

const handleSubmitPlaceAddCardForm = (event) => {
	event.preventDefault();

	// formData = { name: 'asdsadsa', link: 'asdasd' }
	const formData = Object.fromEntries(new FormData(event.target));

	handleCreateCard(formData);
	event.target.reset();

	closePopup(profileCardAddPopup);
};

placeAddCardForm.addEventListener("submit", handleSubmitPlaceAddCardForm);
