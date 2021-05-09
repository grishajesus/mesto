import { getModalByEvent, handleOpenPopupByEvent } from "./common.js";

const initialCards = [
	{
		name: "Архыз",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link:
			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

const $placesListContainer = document.getElementById("places-list");

// place card template
const placesListCardTemplate = (place) => `
    <div class="place-card">
        <div class="place-card__delete"></div>
        <img src="${place.link}" class="place-card__image" alt="${place.name}" data-modal-id="place-image" />

        <div class="place-card__description">
            <h3 class="place-card__name">${place.name}</h3>
            <button type="button" class="place-card__like-icon"></button>
        </div>
    </div>
`;

// create card by place data
const handleCreateCard = (place) =>
	$placesListContainer.insertAdjacentHTML(
		"afterbegin",
		placesListCardTemplate(place)
	);

// delete card by card element
const handleDeleteCard = (card) => {
	if (!card) {
		return;
	}

	card.remove();
};

// add listener for delete cards
document.body.addEventListener("click", (event) => {
	const target = event.target;

	const placeCard = target.closest(".place-card");
	const isRemoveTrigger = target.classList.contains("place-card__delete");

	if (!placeCard || !isRemoveTrigger) {
		return;
	}

	handleDeleteCard(placeCard);
});

// add listener for open modal image
document.body.addEventListener("click", (event) => {
	const target = event.target;

	const placeCard = target.closest(".place-card");
	const isImageModalTrigger = target.classList.contains("place-card__image");

	if (!placeCard || !isImageModalTrigger) {
		return;
	}

	const $modalImage = getModalByEvent(event);

	if (!$modalImage) {
		return;
	}

	$modalImage.querySelector(".popup-image__image").src = target.src;

	$modalImage.querySelector(
		".popup-image__title"
	).textContent = placeCard.querySelector(".place-card__name").textContent;

	handleOpenPopupByEvent(event);
});

// add listener for toggle like cards
document.body.addEventListener("click", (event) => {
	const target = event.target;

	const isLikeTrigger = target.classList.contains("place-card__like-icon");

	if (!isLikeTrigger) {
		return;
	}

	target.classList.toggle("place-card__like-icon_active");
});

// init cards
initialCards.forEach(handleCreateCard);

export { handleCreateCard };
