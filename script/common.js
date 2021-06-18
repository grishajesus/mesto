const keyCodes = {
  ESCAPE: "Escape",
}

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

const findCurrentOverlay = () => document.querySelector('.popup.popup_opened');

const profileOpenButton = document.querySelector('.profile__edit-button');
const profileSettingsPopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profileSettingsPopup.querySelector('.popup__close-button');

const profileCardAddButton = document.querySelector('.profile__add-button');
const profileCardAddPopup = document.querySelector('.popup_type_card-add');
const profileCardAddCloseButton = profileCardAddPopup.querySelector('.popup__close-button');

const cardImagePopup = document.querySelector('.popup_type_image');
const cardImagePopupCloseButton = cardImagePopup.querySelector('.popup__close-button');

document.body.addEventListener('click', (e) => {
  const currentOverlay = findCurrentOverlay();

  if (e.target.classList.contains('popup')) {
    closePopup(currentOverlay);
  }
})

document.body.addEventListener('keydown', (e) => {
  const currentOverlay = findCurrentOverlay();

  if (e.code === keyCodes.ESCAPE && currentOverlay !== null) {
    closePopup(currentOverlay);
  }
})

profileOpenButton.addEventListener('click', () => openPopup(profileSettingsPopup));
profileCardAddButton.addEventListener('click', () => openPopup(profileCardAddPopup));

profileCloseButton.addEventListener('click', () => closePopup(profileSettingsPopup));
profileCardAddCloseButton.addEventListener('click', () => closePopup(profileCardAddPopup));
cardImagePopupCloseButton.addEventListener('click', () => closePopup(cardImagePopup));

export { profileSettingsPopup, profileCardAddPopup, cardImagePopup, openPopup, closePopup };
