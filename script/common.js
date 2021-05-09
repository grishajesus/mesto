const getModalByEvent = (event) => {
	const modal = document.getElementById(
		event.target.dataset.modalId.replace("#", "")
	);

	return modal;
};

const handleOpenPopupByEvent = (event) => {
	const modal = getModalByEvent(event);

	if (!modal) {
		return;
	}

	modal.classList.add("popup_opened");
};

const handleClosePopupByEvent = (event) => {
	const modal = event.target.closest(".popup");

	if (!modal) {
		return;
	}

	modal.classList.remove("popup_opened");
};

const $triggerPopupElements = document.querySelectorAll(".trigger-popup");
const $closePopupElements = document.querySelectorAll(".popup__close-button");

$triggerPopupElements.forEach((element) =>
	element.addEventListener("click", handleOpenPopupByEvent)
);

$closePopupElements.forEach((element) =>
	element.addEventListener("click", handleClosePopupByEvent)
);

export { getModalByEvent, handleOpenPopupByEvent, handleClosePopupByEvent };
