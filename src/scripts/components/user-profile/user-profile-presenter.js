import {
    profileSettingsPopup,
    profileEditAvatarPopup,
} from "src/scripts/components/popup";
import {
    profileSettingsFormValidator,
    profileEditAvatarFormValidator,
} from "src/scripts/components/validator";

class UserProfilePresenter {
    constructor(options) {
        const {
            avatarSelector,
            nameSelector,
            descriptionSelector,
            editButtonSelector,
            editAvatarButtonSelector,
        } = options;

        this.avatar = document.querySelector(avatarSelector);
        this.name = document.querySelector(nameSelector);
        this.description = document.querySelector(descriptionSelector);
        this.editButton = document.querySelector(editButtonSelector);
        this.editAvatarButton = document.querySelector(
            editAvatarButtonSelector
        );

        this.callbacks = {};
    }

    setCallbacks(callbacks) {
        this.callbacks = callbacks;
    }

    setUserProfile(userProfile) {
        this.userProfile = userProfile;
    }

    getUserProtfile() {
        return this.userProfile;
    }

    setUserAvatar(payload) {
        const { avatar, name } = payload;

        this.avatar.src = avatar;
        this.avatar.alt = name;
    }

    setUserInfo(payload) {
        const { name, about } = payload;

        this.name.textContent = name;
        this.description.textContent = about;
    }

    render() {
        this._setEventListener();

        this.setUserAvatar(this.userProfile);
        this.setUserInfo(this.userProfile);
    }

    _handleSettingsSubmit = async (formData) => {
        const { onSaveSettings } = this.callbacks;

        await onSaveSettings(formData);

        this.setUserInfo(formData);
    };

    _handleClickOpenEditPopup = () => {
        const { name, about } = this.userProfile;

        profileSettingsPopup.setOnSubmitted(this._handleSettingsSubmit);
        profileSettingsPopup.setInputValues({ name, about });
        profileSettingsPopup.setValidator(profileSettingsFormValidator);
        profileSettingsPopup.open();
    };

    _handleEditAvatarSubmit = async (formData) => {
        const { avatar } = formData;

        const { name } = this.userProfile;
        const { onSaveAvatar } = this.callbacks;

        await onSaveAvatar(avatar);

        this.setUserAvatar({ avatar, name });
    };

    _handleClickOpenAvatarPopup = () => {
        const { avatar } = this.userProfile;

        profileEditAvatarPopup.setOnSubmitted(this._handleEditAvatarSubmit);
        profileEditAvatarPopup.setInputValues({ avatar });
        profileEditAvatarPopup.setValidator(profileEditAvatarFormValidator);
        profileEditAvatarPopup.open();
    };

    _setEventListener() {
        this.editAvatarButton.addEventListener(
            "click",
            this._handleClickOpenAvatarPopup
        );

        this.editButton.addEventListener(
            "click",
            this._handleClickOpenEditPopup
        );
    }
}

export { UserProfilePresenter };
