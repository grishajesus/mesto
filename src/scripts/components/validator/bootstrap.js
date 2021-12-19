import { FormValidator, defaultFormValidatorSelectors } from "./form-validator";

// init PROFILE SETTINGS FORM validator
const profileSettingsFormValidator = new FormValidator(
    'form[name="profile-settings__form"]',
    defaultFormValidatorSelectors
);

// init PROFILE EDIT AVATAR FORM validator
const profileEditAvatarFormValidator = new FormValidator(
    'form[name="profile-edit-avatar__form"]',
    defaultFormValidatorSelectors
);

// init PLACE CREATE FORM validator
const placeCreateFormValidator = new FormValidator(
    'form[name="place-add-card__form"]',
    defaultFormValidatorSelectors
);

export {
    profileSettingsFormValidator,
    profileEditAvatarFormValidator,
    placeCreateFormValidator,
};
