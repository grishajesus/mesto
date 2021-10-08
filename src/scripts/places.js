import { cardImagePopup, openPopup } from "./common.js";

const initialCards = [
	{
		title: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		title: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		title: "Иваново",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		title: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		title: "Холмогорский район",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		title: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

const placesListContainer = document.getElementById("places-list");

// place card template
const generatePlaceCardTemplate = place => {
	const placeCardTemplate = document.querySelector('#place-card-template').content;
	const placeCardElement = placeCardTemplate.querySelector('.place-card').cloneNode(true);
    const placeCardImage = placeCardElement.querySelector('.place-card__image');

	// set data
	placeCardImage.src = place.link;
	placeCardImage.alt = place.name;
	placeCardElement.querySelector('.place-card__name').textContent = place.title;

	// add listeners
    // -> for delete
	placeCardElement.querySelector('.place-card__delete').addEventListener('click', () => {
        handleDeleteCard(placeCardElement)
    });

    // -> for toggle like
    placeCardElement.querySelector('.place-card__like-icon').addEventListener('click', event => {
        event.target.classList.toggle("place-card__like-icon_active");
    });

    // -> for open image
    placeCardImage.addEventListener('click', () => {
        cardImagePopup.querySelector(".popup-image__image").src = place.link;
        cardImagePopup.querySelector(".popup-image__title").textContent = place.title;

        openPopup(cardImagePopup);
    });

	return placeCardElement;
};

// create card by place data
const handleCreateCard = (place) =>
	placesListContainer.prepend(generatePlaceCardTemplate(place));

// delete card by card element
const handleDeleteCard = (card) => {
	if (!card) {
		return;
	}

	card.remove();
};

// init cards
initialCards.forEach(handleCreateCard);

export { handleCreateCard };
