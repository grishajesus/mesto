import { handleClosePopupByEvent } from "./common.js";

const $profileSettingsForm = document.querySelector(
	'form[name="profile-settings__form"]'
);

const $profileTitle = document.querySelector(".profile__name");
const $profileSubtitle = document.querySelector(".profile__job");
const $profileEditButton = document.querySelector(".profile__edit-button");

const handleSubmitProfileSettingsForm = (event) => {
	event.preventDefault();

	const formData = Object.fromEntries(new FormData(event.target));

	$profileTitle.textContent = formData.name;
	$profileSubtitle.textContent = formData.about;

	handleClosePopupByEvent(event);
};

$profileEditButton.addEventListener("click", () => {
	const $nameInput = $profileSettingsForm.querySelector('input[name="name"]');
	const $aboutInput = $profileSettingsForm.querySelector(
		'input[name="about"]'
	);

	$nameInput.value = $profileTitle.textContent;
	$aboutInput.value = $profileSubtitle.textContent;
});

$profileSettingsForm.addEventListener(
	"submit",
	handleSubmitProfileSettingsForm
);