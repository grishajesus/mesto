const openPopup = (modal) => {
	if (!modal) {
		return;
	}

	modal.classList.add("popup_opened");
};

const closePopup = (modal) => {
	if (!modal) {
		return;
	}

	modal.classList.remove("popup_opened");
};

const profileOpenButton = document.querySelector('.profile__edit-button');
const profileSettingsPopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profileSettingsPopup.querySelector('.popup__close-button');

const profileCardAddButton = document.querySelector('.profile__add-button');
const profileCardAddPopup = document.querySelector('.popup_type_card-add');
const profileCardAddCloseButton = profileCardAddPopup.querySelector('.popup__close-button');

const cardImagePopup = document.querySelector('.popup_type_image');
const cardImagePopupCloseButton = cardImagePopup.querySelector('.popup__close-button');

profileOpenButton.addEventListener('click', () => openPopup(profileSettingsPopup));
profileCardAddButton.addEventListener('click', () => openPopup(profileCardAddPopup));

profileCloseButton.addEventListener('click', () => closePopup(profileSettingsPopup));
profileCardAddCloseButton.addEventListener('click', () => closePopup(profileCardAddPopup));
cardImagePopupCloseButton.addEventListener('click', () => closePopup(cardImagePopup));

export { profileSettingsPopup, profileCardAddPopup, cardImagePopup, openPopup, closePopup };
