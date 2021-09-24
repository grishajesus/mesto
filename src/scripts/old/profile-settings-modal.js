import { openPopup, closePopup } from "./popup.js";
import { FormValidator, defaultFormValidatorSelectors } from "./FormValidator.js";

const profileSettingsForm = document.querySelector('form[name="profile-settings__form"]');
const placeAddCardFormValidator = new FormValidator('form[name="profile-settings__form"]', defaultFormValidatorSelectors);

const nameInput = profileSettingsForm.querySelector('input[name="name"]');
const aboutInput = profileSettingsForm.querySelector('input[name="about"]');

const profileSettingsPopup = document.querySelector('.popup_type_profile');
const profileSettingsPopupCloseButton = profileSettingsPopup.querySelector('.popup__close-button');

const profileTitle = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__job");
const profileEditButton = document.querySelector(".profile__edit-button");

const handleSubmitProfileSettingsForm = (event) => {
	event.preventDefault();

	const formData = Object.fromEntries(new FormData(event.target));

	profileTitle.textContent = formData.name;
	profileSubtitle.textContent = formData.about;

	closePopup(profileSettingsPopup);
};

profileEditButton.addEventListener("click", () => {
	nameInput.value = profileTitle.textContent;
	aboutInput.value = profileSubtitle.textContent;

    placeAddCardFormValidator.enableValidation();

    openPopup(profileSettingsPopup);
});

profileSettingsPopupCloseButton.addEventListener('click', () => closePopup(profileSettingsPopup));

profileSettingsForm.addEventListener(
	"submit",
	handleSubmitProfileSettingsForm
);
