import { Popup } from "./popup";

class PopupWithImage extends Popup {
    open(link, title) {
        this.popup.querySelector(".popup-image__image").src = link;
        this.popup.querySelector(".popup-image__title").textContent = title;

        super.open();
    }
}

export { PopupWithImage };
