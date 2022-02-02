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

// init place image popup
const placeImagePopup = new PopupWithImage(".popup_type_image");
placeImagePopup.setEventListeners();

// init place delete sure popup
const placeDeleteSurePopup = new PopupSure(".popup_sure");
placeDeleteSurePopup.setEventListeners();

const handleCreateLike = (cardId, onSetLikes, onToggleLikeClass) => {
    api.createLike(cardId)
        .then((place) => {
            onSetLikes(place);
            onToggleLikeClass();
        })
        .catch((error) => {
            console.error(error);
        });
};

const handleDeleteLike = (cardId, onSetLikes, onToggleLikeClass) => {
    api.deleteLike(cardId)
        .then((place) => {
            onSetLikes(place);
            onToggleLikeClass();
        })
        .catch((error) => {
            console.error(error);
        });
};

function createCard(item) {
    const currentUser = userInfo.getUserInfo();

    const card = new Card(
        item,
        currentUser,
        "#place-card-template",
        placeImagePopup.open.bind(placeImagePopup),
        () => {
            placeDeleteSurePopup.setSubmitFunction(() => {
                placeDeleteSurePopup.enableLoading();

                api.deleteCard(card._place._id)
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

            placeDeleteSurePopup.open();
        },
        handleCreateLike,
        handleDeleteLike
    );

    const cardNode = card.createDOMNode();

    return cardNode;
}

let placesSection;

Promise.all([api.getCurrentUser(), api.getPlaces()])
    .then((values) => {
        const [user, places] = values;

        userInfo.setUserInfo(user);

        const items = [...places].reverse();

        placesSection = new Section(
            {
                items,
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
        console.error(error);
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
    data
) {
    profileSettingsPopup.enableLoading();

    api.updateUser(data)
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
profileEditAvatarFormValidator.enableValidation();

const profileEditAvatarPopup = new PopupWithForm(
    ".popup_profile-avatar",
    (data) => {
        profileEditAvatarPopup.enableLoading();

        api.updateUserAvatar(data.avatar)
            .then((user) => {
                userInfo.setUserAvatar(user.avatar);

                profileEditAvatarPopup.close();
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                profileEditAvatarPopup.disableLoading();
            });
    }
);
profileEditAvatarPopup.setEventListeners();

document.querySelector(".profile__pic-edit").addEventListener("click", () => {
    profileEditAvatarPopup.open();
});

// init place add popup
const placeAddFormValidator = new FormValidator(
    'form[name="place-add-card__form"]',
    defaultFormValidatorSelectors
);
placeAddFormValidator.enableValidation();

const placeAddPopup = new PopupWithForm(".popup_type_card-add", function (
    data
) {
    const payload = {
        ...data,
        name: data.title,
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
