import { PopupWithImage } from "./popup-with-image";
import { PopupWithForm } from "./popup-with-form";
import { PopupSure } from "./popup-sure";

// init place image popup
const placeImagePopup = new PopupWithImage(".popup_type_image");
placeImagePopup.setEventListeners();

// init profile settings popup
const handleProfileSettingFormSubmit = async function (event) {
    event.preventDefault();

    const formData = this._getInputValues(event);

    this.enableLoading();
    await this.onSubmitted(formData);
    this.disableLoading();

    this.close();
};

const profileSettingsPopup = new PopupWithForm(
    ".popup_type_profile",
    handleProfileSettingFormSubmit
);
profileSettingsPopup.setEventListeners();

// init profile edit avatar popup
const handleProfileEditAvatarFormSubmit = async function (event) {
    event.preventDefault();

    const formData = this._getInputValues(event);

    this.enableLoading();
    await this.onSubmitted(formData);
    this.disableLoading();

    this.close();
};

const profileEditAvatarPopup = new PopupWithForm(
    ".popup_profile-avatar",
    handleProfileEditAvatarFormSubmit
);
profileEditAvatarPopup.setEventListeners();

// init place create popup
const handlePlaceCreateFormSubmit = async function (event) {
    event.preventDefault();

    const formData = this._getInputValues(event);

    this.enableLoading();
    await this.onSubmitted(formData);
    this.disableLoading();

    this.close();
};

const placeCreatePopup = new PopupWithForm(
    ".popup_type_card-add",
    handlePlaceCreateFormSubmit
);
placeCreatePopup.setEventListeners();

// init place delete sure popup
const handlePlaceDeleteSurePopupSubmit = async function (event) {
    event.preventDefault();

    this.enableLoading();
    await this.onSubmitted();
    this.disableLoading();

    this.close();
};
const placeDeleteSurePopup = new PopupSure(
    ".popup_sure",
    handlePlaceDeleteSurePopupSubmit
);
placeDeleteSurePopup.setEventListeners();

export {
    placeImagePopup,
    profileSettingsPopup,
    profileEditAvatarPopup,
    placeCreatePopup,
    placeDeleteSurePopup,
};
