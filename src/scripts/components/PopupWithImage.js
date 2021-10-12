import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._popupCardImage = this._popup.querySelector(".popup-image__image")
        this._popupTitle = this._popup.querySelector(".popup-image__title");
    }

    open(link, title) {
        this._popupCardImage.src = link;
        this._popupCardImage.alt = title;
        this._popupTitle.textContent = title;

        super.open();
    }
}

export { PopupWithImage };
