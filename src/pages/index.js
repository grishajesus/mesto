import "./index.css";
import { defaultFormValidatorSelectors } from "../scripts/constants/forms.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage";
import { PopupWithForm } from "../scripts/components/PopupWithForm";
import { PopupSure } from "../scripts/components/PopupSure";
import { UserInfo } from "../scripts/components/UserInfo";
import { FormValidator } from "../scripts/components/FormValidator";
import { Section } from "../scripts/components/Section";
import { Card } from "../scripts/components/Card";
import { api } from "../scripts/components/Api";

// init user info
const userInfo = new UserInfo(
    ".profile__pic img",
    ".profile__name",
    ".profile__job"
);

api.getCurrentUser()
    .then((user) => {
        userInfo.setUserInfo(user);
    })
    .catch((error) => {
        console.log(error);
    });

// init settings popup
const profileSettingsFormValidator = new FormValidator(
    'form[name="profile-settings__form"]',
    defaultFormValidatorSelectors
);
profileSettingsFormValidator.enableValidation();

const nameInput =
    profileSettingsFormValidator.form.querySelector('input[name="name"]');

const aboutInput = profileSettingsFormValidator.form.querySelector(
    'input[name="about"]'
);

const profileSettingsPopup = new PopupWithForm(".popup_type_profile", function (
    event
) {
    event.preventDefault();

    const formData = profileSettingsPopup.getInputValues(event);

    profileSettingsPopup.enableLoading();

    api.updateUser(formData)
        .then((user) => {
            userInfo.setUserInfo(user);

            profileSettingsPopup.close();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            profileSettingsPopup.disableLoading();
        });
});

profileSettingsPopup.setEventListeners();

// init profile edit avatar
const profileEditAvatarFormValidator = new FormValidator(
    'form[name="profile-edit-avatar__form"]',
    defaultFormValidatorSelectors
);

const profileEditAvatarPopup = new PopupWithForm(
    ".popup_profile-avatar",
    (event) => {
        event.preventDefault();

        const formData = profileEditAvatarPopup.getInputValues(event);

        profileEditAvatarPopup.enableLoading();

        api.updateUserAvatar(formData.avatar)
            .then((user) => {
                userInfo.setUserAvatar(user.avatar);

                profileEditAvatarPopup.close();
            })
            .catch()
            .finally(() => {
                profileEditAvatarPopup.disableLoading();
            });
    }
);
profileEditAvatarPopup.setEventListeners();

document.querySelector(".profile__pic-edit").addEventListener("click", () => {
    profileEditAvatarFormValidator.enableValidation();
    profileEditAvatarPopup.open();
});

// init place image popup
const placeImagePopup = new PopupWithImage(".popup_type_image");
placeImagePopup.setEventListeners();

// init place delete sure popup
const placeDeleteSurePopup = new PopupSure(".popup_sure", (card, cardId) => {
    placeDeleteSurePopup.enableLoading();

    api.deleteCard(cardId)
        .then(() => {
            card.remove();
            placeDeleteSurePopup.close();
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            placeDeleteSurePopup.disableLoading();
        });
});
placeDeleteSurePopup.setEventListeners();

function createCard(item) {
    const currentUser = userInfo.getUserInfo();

    const canDelete = item.owner ? currentUser.id === item.owner._id : true;

    const isSettedLike = !!item.likes.find(
        (like) => like._id === currentUser.id
    );

    const card = new Card(
        item,
        "#place-card-template",
        canDelete,
        isSettedLike,
        placeImagePopup.open.bind(placeImagePopup),
        placeDeleteSurePopup.open.bind(placeDeleteSurePopup),
        api.createLike.bind(api),
        api.deleteLike.bind(api)
    );
    const cardNode = card.createDOMNode();

    return cardNode;
}

let placesSection;

// initialite places
api.getPlaces()
    .then((data) => {
        const places = [...data].reverse();

        placesSection = new Section(
            {
                items: places,
                renderer: (place) => {
                    const card = createCard(place);

                    placesSection.addItem(card);
                },
            },
            "#places-list"
        );

        placesSection.render();
    })
    .catch((error) => {
        console.log(error);
    });

// init place add popup
const placeAddFormValidator = new FormValidator(
    'form[name="place-add-card__form"]',
    defaultFormValidatorSelectors
);
placeAddFormValidator.enableValidation();

const placeAddPopup = new PopupWithForm(".popup_type_card-add", function (
    event
) {
    event.preventDefault();

    const formData = placeAddPopup.getInputValues(event);

    const payload = {
        ...formData,
        name: formData.title,
    };

    placeAddPopup.enableLoading();

    api.createCard(payload)
        .then((place) => {
            const card = createCard(place);

            placesSection.addItem(card);
            placeAddPopup.close();
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            placeAddPopup.disableLoading();
        });
});

placeAddPopup.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
    placeAddFormValidator.checkIsPossibleSubmit();
    placeAddPopup.open();
});

document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
        const { name, description } = userInfo.getUserInfo();

        nameInput.value = name;
        aboutInput.value = description;

        profileSettingsFormValidator.checkIsPossibleSubmit();
        profileSettingsPopup.open();
    });
