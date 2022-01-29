import { keyCodes } from "../constants/common.js";

class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);

        this.handleClickOverlayClose = this._handleClickOverlayClose.bind(this);
        this.handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        if (!this._popup) {
            return;
        }

        this._popup.classList.add("popup_opened");
        this._popup.focus();
    }

    close() {
        if (!this._popup) {
            return;
        }

        this._popup.classList.remove("popup_opened");
    }

    setEventListeners() {
        this._popup.addEventListener("click", this.handleClickOverlayClose);
        document.body.addEventListener("keydown", this.handleEscClose);

        this._popup
            .querySelector(".popup__close-button")
            .addEventListener("click", () => this.close());
    }

    _handleClickOverlayClose = (event) => {
        if (event.target.classList.contains("popup")) {
            this.close(this._popup);
        }
    };

    _handleEscClose = (event) => {
        if (event.code === keyCodes.ESCAPE && this._popup !== null) {
            this.close();
        }
    };
}

export { Popup };
