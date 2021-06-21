const keyCodes = {
    ESCAPE: "Escape",
}

const findCurrentOverlay = () => document.querySelector('.popup.popup_opened');

const closePopupByClick = evt => {
    const currentOverlay = findCurrentOverlay();

    if (evt.target.classList.contains('popup')) {
        closePopup(currentOverlay);
    }
};

const closePopupByEsc = evt => {
    const currentOverlay = findCurrentOverlay();

    if (evt.code === keyCodes.ESCAPE && currentOverlay !== null) {
        closePopup(currentOverlay);
    }
};

const openPopup = modal => {
	if (!modal) {
		return;
	}

	modal.classList.add('popup_opened');
    modal.addEventListener('click', closePopupByClick);
    document.body.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (modal) => {
	if (!modal) {
		return;
	}

	modal.classList.remove("popup_opened");
    modal.removeEventListener('click', closePopupByClick);
    document.body.removeEventListener('keydown', closePopupByEsc);
};

const profileOpenButton = document.querySelector('.profile__edit-button');
const profileSettingsPopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profileSettingsPopup.querySelector('.popup__close-button');

const profileCardAddButton = document.querySelector('.profile__add-button');
const profileCardAddPopup = document.querySelector('.popup_type_card-add');
const profileCardAddCloseButton = profileCardAddPopup.querySelector('.popup__close-button');
const profileCardAddSubmitButton = profileCardAddPopup.querySelector('.popup__submit-button');

const cardImagePopup = document.querySelector('.popup_type_image');
const cardImagePopupCloseButton = cardImagePopup.querySelector('.popup__close-button');

profileOpenButton.addEventListener('click', () => openPopup(profileSettingsPopup));
profileCardAddButton.addEventListener('click', () => {
    profileCardAddSubmitButton.classList.add('disabled', 'popup__submit-button_error');
    openPopup(profileCardAddPopup);
});

profileCloseButton.addEventListener('click', () => closePopup(profileSettingsPopup));
profileCardAddCloseButton.addEventListener('click', () => closePopup(profileCardAddPopup));
cardImagePopupCloseButton.addEventListener('click', () => closePopup(cardImagePopup));

export { profileSettingsPopup, profileCardAddPopup, cardImagePopup, openPopup, closePopup };
