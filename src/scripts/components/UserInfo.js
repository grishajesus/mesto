class UserInfo {
    constructor(avatarSelector, nameSelector, descriptionSelector) {
        this._id = null;
        this.avatar = document.querySelector(avatarSelector);
        this.name = document.querySelector(nameSelector);
        this.description = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        const userInfo = {
            id: this._id,
            name: this.name.textContent,
            description: this.description.textContent,
        };

        return userInfo;
    }

    setUserInfo(user) {
        this._id = user._id;
        this.name.textContent = user.name;
        this.description.textContent = user.about;

        this.setUserAvatar(user.avatar);
    }

    setUserAvatar(avatar) {
        this.avatar.src = avatar;
        this.avatar.alt = this.name.textContent;
    }
}

export { UserInfo };
