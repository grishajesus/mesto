import './styles/index.css'

import { places } from './scripts/constants/places';
import { PopupWithImage } from './scripts/components/PopupWithImage';
import { PopupWithForm } from './scripts/components/PopupWithForm';
import { UserInfo } from './scripts/components/UserInfo'
import { FormValidator, defaultFormValidatorSelectors } from "./scripts/components/FormValidator";
import { Section } from "./scripts/components/Section";
import { Card } from "./scripts/components/Card";

// init user info
const userInfo = new UserInfo('.profile__name', '.profile__job');

// init profile settings popup
const placeImagePopup = new PopupWithImage('.popup_type_image');
placeImagePopup.setEventListeners();

// initialite places
const placesSection = new Section({
    items: places,
    renderer: place => {
        const card = new Card(place, '#place-card-template', placeImagePopup.open.bind(placeImagePopup));
        const cardNode = card.createDOMNode();

        placesSection.addItem(cardNode);
    },
}, '#places-list');

placesSection.render();

// init place add popup
const placeAddFormValidator = new FormValidator(
    'form[name="place-add-card__form"]',
    defaultFormValidatorSelectors
);

const placeAddPopup = new PopupWithForm(
    '.popup_type_card-add',
    function (event) {
        event.preventDefault();

        const formData = this._getInputValues(event);

        const card = new Card(formData, '#place-card-template');
        const cardNode = card.createDOMNode();

        placesSection.addItem(cardNode);

        this.close();
    }
);

placeAddPopup.setEventListeners();

document.querySelector('.profile__add-button')
    .addEventListener('click', () => {
        placeAddFormValidator.enableValidation();
        placeAddPopup.open();
    });

// init settings popup
const profileSettingsFormValidator = new FormValidator(
    'form[name="profile-settings__form"]',
    defaultFormValidatorSelectors
);

const nameInput = profileSettingsFormValidator.form.querySelector('input[name="name"]');
const aboutInput = profileSettingsFormValidator.form.querySelector('input[name="about"]');

const profileSettingsPopup = new PopupWithForm(
    '.popup_type_profile',
    function (event) {
        event.preventDefault();

        const formData = this._getInputValues(event);

        userInfo.setUserInfo(formData.name, formData.about);

        this.close();
    }
);

profileSettingsPopup.setEventListeners();

document.querySelector('.profile__edit-button')
    .addEventListener('click', () => {
        const { name, description } = userInfo.getUserInfo();

        nameInput.value = name;
        aboutInput.value = description;

        profileSettingsFormValidator.enableValidation();
        profileSettingsPopup.open();
    });
