const keyCodes = {
    ESCAPE: "Escape",
}

const POPUP_TAG = '.popup';

const findCurrentOverlay = () => document.querySelector(POPUP_TAG + '.popup_opened');

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

// set to displat flex load page
// cuz of appearing popup with opacity: 0 and visiblity: hidden
window.addEventListener('load', () => {
    const popups = document.querySelectorAll(POPUP_TAG);

    popups.forEach(popup => {
        popup.style.display = 'flex';
    })
});

export { openPopup, closePopup };
