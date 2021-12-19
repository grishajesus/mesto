import { api } from "src/scripts/api";

import { UserProfilePresenter } from "./user-profile-presenter";

class UserProfileContainer {
    constructor(api, presenter) {
        this.api = api;
        this.presenter = presenter;

        this._userProfile = null;
    }

    async init() {
        this._userProfile = await this.api.getCurrentUser();

        this.presenter.setUserProfile(this._userProfile);
        this.presenter.setCallbacks({
            onSaveSettings: this.api.updateUser.bind(api),
            onSaveAvatar: this.api.updateUserAvatar.bind(api),
        });

        this.presenter.render();
    }

    getUserProfile() {
        return this._userProfile;
    }

    getUserId() {
        return this.getUserProfile()._id;
    }
}

const userProfileContainer = new UserProfileContainer(
    api,
    new UserProfilePresenter({
        avatarSelector: ".profile__pic img",
        nameSelector: ".profile__name",
        descriptionSelector: ".profile__job",
        editButtonSelector: ".profile__edit-button",
        editAvatarButtonSelector: ".profile__pic-edit",
    })
);

export { userProfileContainer };
